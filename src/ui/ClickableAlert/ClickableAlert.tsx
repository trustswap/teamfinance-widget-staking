import classNames from 'classnames'
import React from 'react'
import { BiInfoCircle, BiX } from 'react-icons/bi'

import { AutoLink } from '../AutoLink'

const variants = {
  green: 'border-green-500 bg-green-100 dark:bg-green-200 text-green-700',
  yellow: 'border-yellow-500 bg-yellow-100 dark:bg-yellow-200 text-yellow-700',
  red: 'border-red-500 bg-red-100 dark:bg-red-200 text-red-700',
  blue: 'border-blue-500 bg-blue-100 dark:bg-blue-200 text-blue-700',
  black: 'border-black bg-black dark:bg-black text-white',
}

export interface ClickableAlertProps extends React.ComponentProps<'div'> {
  className?: string
  variant?: 'green' | 'yellow' | 'red' | 'blue' | 'black'
  /**
   Content of the Alert
   */
  children: React.ReactNode
  showCloseIcon?: boolean
  isOpen: boolean
  setIsOpen: (val: boolean) => void
  href: string
}

export function ClickableAlert({
  className,
  children,
  variant = 'black',
  showCloseIcon,
  isOpen,
  setIsOpen,
  href,
}: ClickableAlertProps) {
  return (
    <div className={classNames('sticky z-30', className)}>
      {isOpen && (
        <div
          id="alert-border-1"
          className={classNames(
            variants[variant],
            'px-3',
            `relative flex items-center gap-x-1 ${
              variant === 'black' ? '' : 'border-t-4'
            }`
          )}
          role="alert"
        >
          <BiInfoCircle className="text-3xl" />

          <AutoLink
            className="flex w-full items-center justify-center gap-x-4 p-4"
            href={href}
          >
            <div
              className={classNames(
                showCloseIcon && 'mr-3',
                'flex text-center text-xs font-medium md:text-base'
              )}
            >
              {children}
            </div>
          </AutoLink>
          {showCloseIcon && (
            <div className="flex items-center">
              <button type="button" onClick={() => setIsOpen(false)}>
                <span className="sr-only">Close</span>
                <BiX
                  className={`${
                    variant === 'black' ? 'text-white' : 'text-blue-lm/60'
                  } h-7 w-7`}
                  aria-hidden="true"
                />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

ClickableAlert.defaultProps = {
  className: undefined,
  variant: 'red',
  showCloseIcon: false,
}
