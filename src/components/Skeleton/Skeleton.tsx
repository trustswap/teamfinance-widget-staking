import classNames from 'classnames'
import React, { ReactNode } from 'react'

interface SkeletonProps {
  show?: boolean
  width: number | string | 'full' | 'fit'
  height: number | string | 'full' | 'fit'
  rounded?: boolean
  children?: ReactNode
}

export default function Skeleton({
  width,
  height,
  show,
  rounded,
  children,
}: SkeletonProps) {
  return show ? (
    <div className="animate-pulse">
      <div
        className={classNames(
          {
            rounded,
          },
          'bg-gray-200'
        )}
        style={{
          width:
            // eslint-disable-next-line no-nested-ternary
            width === 'full' ? '100%' : width === 'fit' ? 'fit-content' : width,
          height:
            // eslint-disable-next-line no-nested-ternary
            height === 'full'
              ? '100%'
              : height === 'fit'
              ? 'fit-content'
              : height,
        }}
      >
        {/* Render children to get correct height and width */}
        {children && <div className="invisible">{children}</div>}
      </div>
    </div>
  ) : (
    <div>{children}</div>
  )
}

Skeleton.defaultProps = {
  show: true,
  rounded: false,
  children: undefined,
}
