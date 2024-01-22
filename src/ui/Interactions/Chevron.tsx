import classNames from 'classnames'
import React from 'react'
import { MdChevronRight } from 'react-icons/md'

interface ChevronProps {
  className?: string
}

function textToFill(value?: string) {
  return value?.replace('text-', 'fill-')
}

export default function Chevron({ className }: ChevronProps) {
  return (
    <span className="ml-2 inline-flex items-center">
      <svg
        className={classNames(
          textToFill(className),
          '-mr-[1.15rem] scale-x-50 p-0 opacity-0 transition ease-in-out group-hover:scale-x-90 group-hover:opacity-100'
        )}
        width="12"
        height="3"
        viewBox="0 0 12 2"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          className={classNames(textToFill(className))}
          width="12"
          height="2"
        />
      </svg>
      <MdChevronRight
        viewBox="0 0 24 24"
        size={24}
        className={classNames(
          className,
          'p-0 transition ease-in-out group-hover:translate-x-1'
        )}
      />
    </span>
  )
}

Chevron.defaultProps = {
  className: undefined,
}
