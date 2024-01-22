/* eslint-disable react/button-has-type */
import classNames from 'classnames'
import React from 'react'
import { BiLoaderAlt } from 'react-icons/bi'

import { sizes, variants } from './base'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'xs' | 'sm' | 'md'
  fullWidth?: boolean
  icon?: any
  iconPosition?: 'prefix' | 'suffix'
  align?: 'start' | 'center' | 'grow' | 'end'
  isLoading?: boolean
  children?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      variant,
      size,
      fullWidth,
      icon,
      iconPosition,
      align,
      isLoading,
      children,
      ...remainingProps
    } = props

    const Icon = () => icon

    return (
      <button
        ref={ref}
        type={props.type || 'button'}
        className={classNames(
          {
            'w-full': fullWidth,
            '!cursor-progress': isLoading,
            'justify-start': align === 'start',
            'justify-center': align === 'center',
            'justify-end': align === 'end',
          },
          className,
          variants[variant!],
          sizes[size!],
          'group'
        )}
        disabled={props.disabled || isLoading}
        {...remainingProps}
      >
        {icon ? (
          <div
            className={classNames(
              { 'w-full': align === 'grow' },
              'flex flex-shrink-0 items-center gap-x-1.5'
            )}
          >
            {icon && iconPosition === 'prefix' && !isLoading && <Icon />}
            {isLoading && iconPosition === 'prefix' && (
              <BiLoaderAlt
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            {align === 'grow' ? (
              <div className="flex-shrink-0 flex-grow">{children}</div>
            ) : (
              children
            )}
            {icon && iconPosition === 'suffix' && !isLoading && <Icon />}
            {isLoading && iconPosition === 'suffix' && (
              <BiLoaderAlt
                className="ml-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
          </div>
        ) : (
          <div
            className={classNames(
              { 'w-full': align === 'grow' },
              'flex flex-shrink-0 items-center gap-x-1.5'
            )}
          >
            {children}
            {isLoading && (
              <BiLoaderAlt
                className="ml-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
          </div>
        )}
      </button>
    )
  }
)

Button.defaultProps = {
  className: undefined,
  variant: 'primary',
  size: 'md',
  fullWidth: false,
  align: 'center',
  icon: undefined,
  iconPosition: 'suffix',
  isLoading: false,
}
