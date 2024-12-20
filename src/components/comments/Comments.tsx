'use client'

import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import siteMetadata from 'data/siteMetadata'
import { useParams } from 'next/navigation'
import { Comments as CommentsComponent } from 'pliny/comments'
import { useState } from 'react'

type CommentsProps = {
  slug: string
}

export default function Comments({ slug }: CommentsProps) {
  const [loadComments, setLoadComments] = useState(false)
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'home')
  return (
    <>
      {!loadComments && <button onClick={() => setLoadComments(true)}> {t('comment')}</button>}
      {siteMetadata.comments && loadComments && (
        <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
      )}
    </>
  )
}
