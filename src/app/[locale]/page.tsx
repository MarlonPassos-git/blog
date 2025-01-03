import { allBlogs } from 'contentlayer/generated'
import FeaturedLayout from 'layouts/FeaturedLayout'
import HomeLayout from 'layouts/HomeLayout'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { LocaleTypes } from './i18n/settings'

type HomeProps = {
  params: Promise<{ locale: LocaleTypes }>
}

export default async function Page(props: HomeProps) {
  const params = await props.params

  const { locale } = params

  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  const filteredPosts = posts.filter((p) => p.language === locale)
  const hasFeaturedPosts = filteredPosts.filter((p) => p.featured === true)

  return (
    <>
      {hasFeaturedPosts && <FeaturedLayout posts={hasFeaturedPosts} params={{ locale }} />}
      <HomeLayout posts={filteredPosts} params={{ locale }} />
    </>
  )
}
