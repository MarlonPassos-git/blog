import { genPageMetadata } from 'app/[locale]/seo'
import { Metadata } from 'next'
import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '../i18n/settings'
import Project from './project'

type ProjectsProps = {
  params: Promise<{ locale: LocaleTypes }>
}

export async function generateMetadata(props: ProjectsProps): Promise<Metadata> {
  const params = await props.params

  const { locale } = params

  const { t } = await createTranslation(locale, 'projects')
  return genPageMetadata({
    title: t('title'),
    params: { locale: locale },
  })
}

export default async function Projects(props: ProjectsProps) {
  const params = await props.params

  const { locale } = params

  const { t } = await createTranslation(locale, 'projects')
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-heading-400 dark:text-heading-400 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {t('title')}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{t('description')}</p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            <Project />
          </div>
        </div>
      </div>
    </>
  )
}