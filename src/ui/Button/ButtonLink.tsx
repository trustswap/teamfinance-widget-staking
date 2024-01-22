import classNames from 'classnames'
import React, { HTMLAttributeAnchorTarget } from 'react'

import { AutoLink } from '../AutoLink'
import { sizes, variants } from './base'

export interface ButtonLinkProps
  extends React.ButtonHTMLAttributes<HTMLAnchorElement> {
  className?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'xs' | 'sm' | 'md'
  fullWidth?: boolean
  icon?: any
  iconPosition?: 'prefix' | 'suffix'
  align?: 'start' | 'center' | 'grow' | 'end'
  href: string
  children: React.ReactNode
  target?: HTMLAttributeAnchorTarget
}

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (props, ref) => {
    const {
      className,
      variant,
      size,
      fullWidth,
      icon,
      iconPosition,
      align,
      href,
      children,
      ...remainingProps
    } = props

    const Icon = () => icon

    return (
      <AutoLink
        ref={ref}
        href={href}
        className={classNames(
          {
            'w-full': fullWidth,
            'justify-start': align === 'start',
            'justify-center': align === 'center',
            'justify-end': align === 'end',
          },
          className,
          variants[variant!],
          sizes[size!],
          'group'
        )}
        {...remainingProps}
      >
        {icon ? (
          <div
            className={classNames(
              { 'w-full': align === 'grow' },
              'flex flex-shrink-0 items-center gap-x-1.5'
            )}
          >
            {icon && iconPosition === 'prefix' && <Icon />}
            {align === 'grow' ? (
              <div className="flex-shrink-0 flex-grow">{children}</div>
            ) : (
              children
            )}
            {icon && iconPosition === 'suffix' && <Icon />}
          </div>
        ) : (
          children
        )}
      </AutoLink>
    )
  }
)

ButtonLink.defaultProps = {
  className: undefined,
  variant: 'primary',
  size: 'md',
  fullWidth: false,
  align: 'center',
  icon: undefined,
  iconPosition: 'suffix',
}
