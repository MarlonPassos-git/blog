import { genPageMetadata } from 'app/[locale]/seo'
import tagData from 'app/[locale]/tag-data.json'
import Tag from 'components/tag'
import { Metadata } from 'next'
import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '../i18n/settings'

type TagsProps = {
  params: Promise<{ locale: LocaleTypes }>
}

export async function generateMetadata(props: TagsProps): Promise<Metadata> {
  const params = await props.params

  const { locale } = params

  const { t } = await createTranslation(locale, 'SEO')
  return genPageMetadata({
    title: 'Tags',
    description: t('tags'),
    params: { locale: locale },
  })
}

export default async function Page(props: TagsProps) {
  const params = await props.params

  const { locale } = params
  const { t } = await createTranslation(locale, 'common')

  const tagCounts: { [key: string]: number } = tagData[locale]
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-heading-400 dark:text-heading-400 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            {t('tagstitle')}
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {tagKeys.length === 0 && 'No tags found.'}
          {sortedTags.map((tag) => (
            <div key={tag} className="mb-2 mr-5 mt-2">
              <Tag text={tag} />
              <span className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300">
                {`(${tagCounts[tag]})`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
