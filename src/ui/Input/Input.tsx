import classNames from 'classnames'
import React, { useState } from 'react'

import { Typography } from '../Typography'

export interface InputProps extends React.ComponentProps<'input'> {
  className?: string
  variant?: 'primary' | 'error'
  label?: React.ReactNode
  fullWidth?: boolean
  icon?: any
  suffixIcon?: React.ReactNode
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    variant,
    label,
    fullWidth,
    icon,
    suffixIcon,
    error,
    ...rest
  } = props

  const Icon = () => icon

  const [focused, setFocused] = useState(false)

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
        className={classNames(
          // Base class:
          'bg-white',
          'text-body h-11 rounded-md transition duration-150 disabled:cursor-not-allowed',
          'flex items-center rounded-md',
          {
            border: props.type !== 'checkbox',
          },
          {
            'w-full': fullWidth,
          },
          // Focused variant
          {
            'outline outline-offset-0 outline-blue-300 ring-blue-300':
              focused && !error,
          },
          // Error variant
          {
            'outline outline-2 outline-offset-0 outline-red-500 ring-red-500':
              Boolean(error),
          },
          {
            'outline-none': !focused && !error,
          },
          // Small padding when there is icon
          {
            'pl-3': !icon,
          },
          {
            'pr-3': !suffixIcon,
          }
        )}
      >
        {icon && (
          <div className="pointer-events-none flex h-full items-center px-3">
            <Icon />
          </div>
        )}
        <input
          ref={ref}
          type={props.type || 'text'}
          className={classNames(className, 'h-full outline-none focus:ring-0', {
            'w-full': fullWidth,
          })}
          {...rest}
          onFocus={(e) => {
            setFocused(true)
            rest.onFocus?.(e)
          }}
          onBlur={(e) => {
            setFocused(false)
            rest.onBlur?.(e)
          }}
        />
        {suffixIcon && (
          <div className="flex h-full items-center px-3">{suffixIcon}</div>
        )}
      </div>
    </>
  )
})

Input.defaultProps = {
  className: undefined,
  variant: 'primary',
  label: undefined,
  fullWidth: false,
  icon: false,
  error: false,
}

export default Input
