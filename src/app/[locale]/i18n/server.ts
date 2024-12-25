import { createInstance } from 'i18next'
import type { CustomTypeOptions } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { LocaleTypes, getOptions } from './settings'

// Initialize the i18n instance
const initI18next = async <T extends keyof CustomTypeOptions['resources']>(
  lang: LocaleTypes,
  ns: T
) => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: T) =>
          // load the translation file depending on the language and namespace
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lang, ns))

  return i18nInstance
}

export async function createTranslation<T extends keyof CustomTypeOptions['resources']>(
  lang: LocaleTypes,
  ns: T
) {
  const i18nextInstance = await initI18next(lang, ns)

  return {
    // This is the translation function we'll use in our components
    // e.g. t('greeting')
    t: i18nextInstance.getFixedT<T>(lang, Array.isArray(ns) ? ns[0] : ns),
  }
}
