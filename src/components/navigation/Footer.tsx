import { maintitle } from 'data/localeMetadata'
import siteMetadata from 'data/siteMetadata'
import Link from '../mdxcomponents/Link'

import { LocaleTypes } from 'app/[locale]/i18n/settings'

type Props = {
  locale: LocaleTypes
}

export default async function Footer({ locale }: Props) {
  return (
    <>
      <footer>
        <div className="mt-16 flex flex-col items-center">
          <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <div>{siteMetadata.author}</div>
            <div>{` • `}</div>
            <div>{`© ${new Date().getFullYear()}`}</div>
            <div>{` • `}</div>
            <Link href={`/${locale}`}>{maintitle[locale]}</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
