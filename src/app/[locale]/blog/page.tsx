import { genPageMetadata } from 'app/[locale]/seo'
import { allBlogs } from 'contentlayer/generated'
import ListLayout from 'layouts/ListLayout'
import { Metadata } from 'next'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '../i18n/settings'

type BlogPageProps = {
  params: Promise<{ locale: LocaleTypes }>
}

export async function generateMetadata(props: BlogPageProps): Promise<Metadata> {
  const params = await props.params

  const { locale } = params

  return genPageMetadata({
    title: 'Blog',
    params: { locale: locale },
  })
}

export default async function BlogPage(props: BlogPageProps) {
  const params = await props.params

  const { locale } = params

  const { t } = await createTranslation(locale, 'home')
  const posts = allCoreContent(sortPosts(allBlogs))
  const filteredPosts = posts.filter((post) => post.language === locale)

  return <ListLayout params={{ locale: locale }} posts={filteredPosts} title={t('all')} />
}
