import classNames from 'classnames'
import React from 'react'

const variants = {
  green: 'border-green-500 bg-green-100 dark:bg-green-200 text-green-700',
  yellow: 'border-yellow-500 bg-yellow-100 dark:bg-yellow-200 text-yellow-700',
  red: 'border-red-500 bg-red-100 dark:bg-red-200 text-red-700',
  blue: 'border-blue-500 bg-blue-100 dark:bg-blue-200 text-blue-700',
}

export interface AlertProps extends React.ComponentProps<'div'> {
  className?: string
  variant?: 'green' | 'yellow' | 'red' | 'blue'
  /**
   Content of the Alert
   */
  children: React.ReactNode
}

export function Alert({ className, children, variant = 'red' }: AlertProps) {
  return (
    <div
      id="alert-border-1"
      className={classNames(
        className,
        variants[variant],
        'flex border-t-4 p-4'
      )}
      role="alert"
    >
      <svg
        className="h-5 w-5 flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
      <div className="ml-3 text-sm font-medium">{children}</div>
    </div>
  )
}

Alert.defaultProps = {
  className: undefined,
  variant: 'red',
}
