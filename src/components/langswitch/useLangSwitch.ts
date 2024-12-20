import { LocaleTypes, locales } from 'app/[locale]/i18n/settings'
import { useTagStore } from 'components/util/useTagStore'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useOuterClick } from '../util/useOuterClick'

export const useLangSwitch = () => {
  const pathname = usePathname()
  const params = useParams()
  const locale = String(params.locale)
  const router = useRouter()
  const setSelectedTag = useTagStore((state) => state.setSelectedTag)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const menubarRef = useRef<HTMLDivElement>(null)
  useOuterClick(menubarRef, () => setIsMenuOpen(false))

  const handleLocaleChange = useCallback(
    (newLocale: string): string => {
      const segments = pathname!.split('/')
      const localeIndex = segments.findIndex((segment) => locales.includes(segment as LocaleTypes))
      if (localeIndex !== -1) {
        segments[localeIndex] = newLocale
      } else {
        segments.splice(1, 0, newLocale)
      }
      const newPath = segments.join('/').replace(/\/$/, '')
      return newPath
    },
    [pathname]
  )

  const handleLinkClick = useCallback(
    (newLocale: string) => {
      setSelectedTag('')
      const resolvedUrl = handleLocaleChange(newLocale)
      router.push(resolvedUrl)
      setIsMenuOpen(false)
    },
    [handleLocaleChange, router, setSelectedTag]
  )

  const currentLocale = useMemo(() => locale.charAt(0).toUpperCase() + locale.slice(1), [locale])

  return {
    menubarRef,
    isMenuOpen,
    setIsMenuOpen,
    currentLocale,
    locales,
    handleLinkClick,
  }
}
