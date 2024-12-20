'use client'

import { init } from '@waline/client'
import { useEffect, useState } from 'react'
import '@waline/client/style'
import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import siteMetadata from 'data/siteMetadata'
import { useParams } from 'next/navigation'

export default function WalineComments() {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'home')
  const [loadComments, setLoadComments] = useState<boolean>(false)

  useEffect(() => {
    let _element: HTMLDivElement | null

    if (loadComments) {
      _element = document.getElementById('waline') as HTMLDivElement
      init({
        el: '#waline',
        lang: locale,
        reaction: true,
        serverURL: siteMetadata.walineServer,
        emoji: [
          'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/weibo',
          'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/alus',
        ],
        requiredMeta: ['nick'],
      })
    }

    // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
    return () => {}
  }, [loadComments, locale])

  return (
    <>
      {!loadComments && (
        <button
          className="mb-6 rounded bg-primary-500 p-2 text-white hover:opacity-80 dark:hover:opacity-80"
          onClick={() => setLoadComments(true)}
        >
          {t('comment')}
        </button>
      )}
      {loadComments && <div className="mb-6 mt-6" id="waline" />}
    </>
  )
}
