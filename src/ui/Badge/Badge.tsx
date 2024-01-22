import classNames from 'classnames'
import React, { ReactNode } from 'react'

const variants = {
  gray: 'bg-gray-100 text-gray-800 border-gray-800',
  red: 'bg-red-100 text-red-800 border-red-800',
  yellow: 'bg-yellow-100 text-yellow-800 border-yellow-800',
  green: 'bg-green-100 text-green-800 border-green-800',
  blue: 'bg-blue-100 text-blue-800 border-blue-800',
  indigo: 'bg-indigo-100 text-indigo-800 border-indigo-800',
  purple: 'bg-purple-100 text-purple-800 border-purple-800',
  pink: 'bg-pink-100 text-pink-800 border-pink-800',
}

interface BadgeProps {
  className?: string
  variant:
    | 'gray'
    | 'red'
    | 'yellow'
    | 'green'
    | 'blue'
    | 'indigo'
    | 'purple'
    | 'pink'
  children: ReactNode
}

export default function Badge({ className, variant, children }: BadgeProps) {
  return (
    <span
      className={classNames(
        className,
        variants[variant],
        'inline-flex w-fit items-center rounded-full px-2 py-0.5 text-xs'
      )}
    >
      {children}
    </span>
  )
}

Badge.defaultProps = {
  className: undefined,
}
