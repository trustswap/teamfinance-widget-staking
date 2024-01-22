import classNames from 'classnames'
import React from 'react'

import { Typography } from '../Typography'

const baseClass =
  'transition border text-body h-11 rounded-md duration-150 px-3 py-2 focus:ring-2 focus:outline-none disabled:cursor-not-allowed'

const variants = {
  primary: `${baseClass} bg-white placeholder:text-gray-400 text-gray-700 border-gray-200 focus:border-blue-400 focus:ring-blue-300 hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-600 disabled:hover:bg-gray-50`,
  error: `${baseClass} placeholder:text-neutral-300 text-neutral-700 border-red-600 focus:border-red-400 border-2 focus:ring-red-300`,
}

export interface TextAreaProps extends React.ComponentProps<'textarea'> {
  className?: string
  variant?: 'primary' | 'error'
  label?: React.ReactNode
  fullWidth?: boolean
  error?: boolean
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const {
      className,
      variant = 'primary',
      label,
      fullWidth,
      error,
      ...rest
    } = props

    return (
      <>
        {React.isValidElement(label) ? (
          label
        ) : (
          <Typography className="mb-1 block" variant="caption-2">
            {label}
          </Typography>
        )}
        <div
          className={classNames('rounded-md', {
            'w-full': fullWidth,
          })}
        >
          <textarea
            ref={ref}
            className={classNames(
              className,
              'resize-none',
              'outline-none',
              error ? variants.error : variants[variant!],
              {
                'w-full': fullWidth,
              }
            )}
            {...rest}
          />
        </div>
      </>
    )
  }
)

export default TextArea
