import { Switch as HeadlessSwitch } from '@headlessui/react'
import React from 'react'

interface SwitchProps {
  checked?: boolean
  onChange: () => void
}

export default function Switch({ checked, onChange }: SwitchProps) {
  return (
    <HeadlessSwitch
      checked
      onChange={onChange}
      className={`${
        checked ? 'from-light-blue bg-gradient-to-r to-blue-700' : 'bg-gray-400'
      } relative inline-flex h-5 w-10 items-center rounded-full`}
    >
      <span
        className={`${
          checked ? 'translate-x-[22px]' : 'translate-x-0.5'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </HeadlessSwitch>
  )
}

Switch.defaultProps = {
  checked: false,
}
