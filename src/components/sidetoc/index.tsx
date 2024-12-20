'use client'

import { Toc } from 'pliny/mdx-plugins'
import { useRef } from 'react'
import { useOuterClick } from '../util/useOuterClick'
import Button from './Button'
import TocBody from './TocBody'
import useSidebarStore from './store'

interface SidetocProps {
  toc: Toc
}

const Sidetoc = ({ toc }: SidetocProps) => {
  const { closeSidebar } = useSidebarStore()
  const menubarRef = useRef<HTMLDivElement>(null)

  useOuterClick(menubarRef, closeSidebar)

  return (
    <div ref={menubarRef}>
      <TocBody toc={toc} />
      <Button />
    </div>
  )
}

export default Sidetoc
