import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
  text?: string
}

function ToolTip({ children, text }: Props): JSX.Element {
  return (
    <div className="flex items-center justify-center">
      <div
        className="z-1 relative before:absolute before:-top-3 before:left-1/2 before:w-max before:max-w-xs before:-translate-x-80 before:translate-y-1/3 before:rounded-md before:bg-gray-700 before:px-3 before:py-2 before:text-white before:opacity-0 before:transition-all before:duration-300 before:content-[attr(data-tip)] after:absolute after:left-1/2 after:h-0 after:w-0 after:-translate-x-3.5 after:border-8 after:border-b-gray-700 after:border-l-transparent after:border-r-transparent after:border-t-gray-700 after:border-t-transparent after:opacity-0 after:transition-all after:duration-300 hover:before:opacity-100 hover:after:opacity-100 before:md:-translate-x-1/2 before:md:-translate-y-full after:md:-top-3 after:md:-translate-x-1/2 after:md:border-b-transparent after:md:border-t-gray-700"
        data-tip={text}
      >
        {children}
      </div>
    </div>
  )
}

ToolTip.defaultProps = {
  text: undefined,
}

export default ToolTip
