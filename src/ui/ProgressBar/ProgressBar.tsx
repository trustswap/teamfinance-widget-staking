import classNames from 'classnames'

export interface ProgressBarProps {
  variant: 'success' | 'in-progress' | 'failed' | 'neutral'
  total?: number
  completed?: number
  // Use if there is no total or completed value
  pseudo?: boolean
  // Always have grey background
  neutralBase?: boolean
  className?: string
  innerClassName?: string
}

export function ProgressBar({
  variant,
  pseudo,
  neutralBase,
  total,
  completed,
  className,
  innerClassName,
}: ProgressBarProps) {
  function getOuterClass() {
    if (neutralBase) {
      return 'bg-gray-300'
    }
    if (variant === 'success') {
      return 'bg-green-400'
    }
    if (variant === 'in-progress') {
      return 'bg-blue-200'
    }
    if (variant === 'failed') {
      return 'bg-red-900'
    }
    if (variant === 'neutral') {
      return 'bg-yellow-900'
    }
    return 'bg-gray-800'
  }

  // The filling bar
  function getInnerClass() {
    if (variant === 'success') {
      return 'bg-[#04B816]' // 'bg-green-600'
    }
    if (variant === 'in-progress') {
      return 'bg-blue-600'
    }
    if (variant === 'failed') {
      return 'bg-red-600'
    }
    if (variant === 'neutral') {
      return 'bg-yellow-600'
    }
    return 'bg-gray-600'
  }

  function getInnerProgressFill() {
    if (variant === 'success') {
      return '50'
    }
    if (variant === 'in-progress') {
      return '0'
    }
    if (variant === 'failed') {
      return '0'
    }
    if (variant === 'neutral') {
      return '0'
    }
    return '50'
  }

  if (!pseudo) {
    if (total === undefined && completed === undefined) {
      throw new Error(
        "'completed' and 'total' are required if 'pseudo' is not provided"
      )
    }
  }

  function getPercentage() {
    const mCompleted = completed || 0
    const mTotal = total || 1
    const progressed = (mCompleted / mTotal > 1 ? 1 : mCompleted / mTotal) * 100
    return progressed
  }

  return (
    <div
      className={classNames(
        getOuterClass(),
        'h-1.5 w-full rounded-full transition-all',
        className
      )}
    >
      <div
        className={classNames(
          getInnerClass(),
          'h-full rounded-full transition-all',
          innerClassName
        )}
        style={{
          width: `${pseudo ? getInnerProgressFill() : getPercentage()}%`,
        }}
      />
    </div>
  )
}
