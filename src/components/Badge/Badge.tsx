import classNames from 'classnames'
import React, { ReactNode } from 'react'

const variants = {
  green: 'bg-green-100 text-green-800 border-green-600',
  yellow: 'bg-yellow-100 text-yellow-800 border-yellow-600',
  red: 'bg-red-100 text-red-800 border-red-600',
  blue: 'bg-blue-100 text-blue-800 border-blue-600',
  gray: 'bg-gray-100 text-gray-800 border-gray-600',
}

interface BadgeProps {
  className?: string
  variant: 'green' | 'yellow' | 'red' | 'blue' | 'gray'
  children: ReactNode
}

export default function Badge({ className, variant, children }: BadgeProps) {
  return (
    <span
      className={classNames(
        className,
        variants[variant],
        'inline-flex items-center rounded border px-1.5 py-0.5 text-xs font-medium'
      )}
    >
      {children}
    </span>
  )
}

Badge.defaultProps = {
  className: undefined,
}
