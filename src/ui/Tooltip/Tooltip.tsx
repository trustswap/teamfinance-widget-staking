import { ReactNode } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

export interface TooltipProps {
  id: string
  children: ReactNode
  maxWidth?: number
}

export function Tooltip({ id, children, maxWidth }: TooltipProps) {
  return (
    <ReactTooltip
      id={id}
      style={{
        borderRadius: '0.5rem',
        zIndex: 50,
        backgroundColor: '#26272B',
        maxWidth,
      }}
    >
      {children}
    </ReactTooltip>
  )
}

Tooltip.defaultProps = {
  maxWidth: 350,
}
