import type { InitOptions } from 'i18next'
import { fallbackLng, secondLng } from './locales'

export const locales = [fallbackLng, secondLng] as const
export type LocaleTypes = (typeof locales)[number]
export const defaultNS = 'common'

export function getOptions(locale = fallbackLng, ns = defaultNS) {
  const options = {
    debug: false,
    supportedLngs: locales,
    fallbackLng,
    lng: locale,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  } satisfies InitOptions

  return options
}
