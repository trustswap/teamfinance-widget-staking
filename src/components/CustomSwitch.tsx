import classNames from 'classnames'
import { motion } from 'framer-motion'
import React from 'react'

import { Typography } from '../ui'

interface AdminSwitchProps {
  className?: string
  show: boolean
  setShow: (checked: boolean) => void
}

export default function CustomSwitch({
  className,
  show,
  setShow,
}: AdminSwitchProps) {
  return (
    <div
      className={classNames(
        className,
        'bg-blue-lm/5 flex h-10 flex-shrink-0 rounded-md p-0.5'
      )}
    >
      <button
        type="button"
        className="relative flex w-full items-center justify-center px-3 py-1 focus:outline-none"
        onClick={() => {
          setShow(false)
        }}
      >
        <Typography
          className="z-10 flex-shrink-0 px-2 text-gray-900"
          variant="button-small"
        >
          Stake more
        </Typography>
        {!show && (
          <motion.div
            className="absolute left-0 top-0 z-0 h-full w-full rounded bg-white"
            layoutId="switch"
          />
        )}
      </button>
      <button
        type="button"
        className="relative flex w-full items-center justify-center px-3 py-1 focus:outline-none"
        onClick={() => {
          setShow(true)
        }}
      >
        <Typography
          className="z-10 flex-shrink-0 px-2 text-gray-900"
          variant="button-small"
        >
          Claim
        </Typography>
        {show && (
          <motion.div
            className="absolute left-0 top-0 z-0 h-full w-full rounded bg-white"
            layoutId="switch"
          />
        )}
      </button>
    </div>
  )
}

CustomSwitch.defaultProps = {
  className: undefined,
}
