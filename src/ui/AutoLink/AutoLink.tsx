import classNames from 'classnames'
import Link from 'next/link'
import React, { HTMLAttributeAnchorTarget } from 'react'

export interface AutoLinkProps
  extends React.ButtonHTMLAttributes<HTMLAnchorElement> {
  className?: string
  href: string
  children: React.ReactNode
  target?: HTMLAttributeAnchorTarget
}

export const AutoLink = React.forwardRef<HTMLAnchorElement, AutoLinkProps>(
  (props, ref) => {
    const { className, href, children, ...remainingProps } = props

    return href?.startsWith('http') &&
      !href.includes('https://app.team.finance') ? (
      // eslint-disable-next-line react/jsx-no-target-blank
      <a
        ref={ref}
        className={classNames(className)}
        href={href}
        target="_blank"
        rel={href.includes('team.finance') ? '' : 'noopener noreferrer'}
        {...remainingProps}
      >
        {children}
      </a>
    ) : (
      <Link
        ref={ref}
        className={classNames(className)}
        href={href}
        {...remainingProps}
      >
        {children}
      </Link>
    )
  }
)

AutoLink.defaultProps = {
  className: undefined,
}
