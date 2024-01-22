import classNames from 'classnames'
import React from 'react'
import { BiArrowBack } from 'react-icons/bi'

interface ArrowProps {
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export default function Arrow({ className, size }: ArrowProps) {
  return (
    <BiArrowBack
      className={classNames(
        className,
        `text-${size}`,
        'rotate-180 transition duration-200 ease-in-out group-hover:translate-x-1'
      )}
    />
  )
}

Arrow.defaultProps = {
  className: undefined,
  size: 'md',
}
