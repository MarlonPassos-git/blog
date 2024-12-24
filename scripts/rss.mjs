import { mkdirSync, writeFileSync } from 'fs'
import path from 'path'
import { slug } from 'github-slugger'
import { sortPosts } from 'pliny/utils/contentlayer.js'
import { escape as plinyEscape } from 'pliny/utils/htmlEscaper.js'
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import tagData from '../src/app/[locale]/tag-data.json' with { type: 'json' }
import siteMetadata from '../src/data/siteMetadata.js'

const defaultLocale = 'pt'

const generateRssItem = (config, post, locale) => `
  <item>
    <guid>${config.siteUrl}${defaultLocale === locale ? '' : '/' + locale}/blog/${post.slug}</guid>
    <title>${plinyEscape(post.title)}</title>
    <link>${config.siteUrl}${defaultLocale === locale ? '' : '/' + locale}/blog/${post.slug}</link>
    ${post.summary ? `<description>${plinyEscape(post.summary)}</description>` : ''}
    ${post.date ? `<pubDate>${new Date(post.date).toUTCString()}</pubDate>` : ''}
    <author>${config.email} (${config.author})</author>
    ${post.tags ? post.tags.map((t) => `<category>${t}</category>`).join('') : ''}
  </item>
`

const generateRss = (config, posts, locale, page = 'feed.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${plinyEscape(config.title)}</title>
      <link>${config.siteUrl}${defaultLocale === locale ? '' : '/' + locale}/blog</link>
      <description>${plinyEscape(config.description)}</description>
      <language>${locale}</language>
      <managingEditor>${config.email} (${config.author})</managingEditor>
      <webMaster>${config.email} (${config.author})</webMaster>
      ${posts.length > 0 ? `<lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>` : ''}
      <atom:link href="${config.siteUrl}/${defaultLocale === locale ? '' : locale + '/'}${page}" rel="self" type="application/rss+xml"/>
      ${posts.map((post) => generateRssItem(config, post, locale)).join('')}
    </channel>
  </rss>
`

async function generateRSS(config, allBlogs, locale, page = 'feed.xml') {
  const filteredPosts = allBlogs.filter((post) => post.language === locale)
  const publishPosts = filteredPosts.filter((post) => post.draft !== true)

  // RSS for blog posts
  if (publishPosts.length > 0) {
    const rss = generateRss(config, sortPosts(publishPosts), locale)
    const directoryPath = path.join('public', locale)
    mkdirSync(directoryPath, { recursive: true }) // Create the directory if it doesn't exist
    writeFileSync(path.join(directoryPath, page), rss)
  }

  // RSS for tag-specific posts
  for (const tag of Object.keys(tagData)) {
    const filteredTagPosts = publishPosts.filter((post) =>
      post.tags.map((t) => slug(t)).includes(tag)
    )
    if (filteredTagPosts.length > 0) {
      const rss = generateRss(config, sortPosts(filteredTagPosts), locale, `tags/${tag}/${page}`)
      const rssPath = path.join('public', locale, 'tags', tag)
      mkdirSync(rssPath, { recursive: true }) // Create the directory if it doesn't exist
      writeFileSync(path.join(rssPath, page), rss)
    }
  }
}

const rss = async () => {
  const locales = ['en', 'pt']
  for (const locale of locales) {
    await generateRSS(siteMetadata, allBlogs, locale)
  }
  console.log('RSS feeds generated...')
}

export default rss
