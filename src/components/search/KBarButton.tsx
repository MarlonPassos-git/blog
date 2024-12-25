import { useKBar } from 'kbar'
import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

interface KbarButtonProps {
  children: ReactNode
  [key: string]: any
}

/**
 * Button wrapper component that triggers the KBar modal on click.
 *
 * @return {*}
 */
export const KBarButton: React.FC<KbarButtonProps> = ({ children, ...rest }) => {
  const { query } = useKBar()

  return (
    <button {...rest} onClick={() => query.toggle()}>
      {children}
    </button>
  )
}
