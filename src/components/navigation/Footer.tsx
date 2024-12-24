'use client'

import SocialIcon from 'components/social-icons'
import { maintitle } from 'data/localeMetadata'
import siteMetadata from 'data/siteMetadata'
import Link from '../mdxcomponents/Link'

import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useParams } from 'next/navigation'

export default function Footer() {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'footer')

  return (
    <>
      <footer>
        <div className="mt-16 flex flex-col items-center">
          <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <div>{siteMetadata.author}</div>
            <div>{` • `}</div>
            <div>{`© ${new Date().getFullYear()}`}</div>
            <div>{` • `}</div>
            <Link href="/">{maintitle[locale]}</Link>
          </div>
          <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
            <Link href="https://github.com/PxlSyl/tailwind-nextjs-starter-blog-i18n">
              {t('theme')}
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}
