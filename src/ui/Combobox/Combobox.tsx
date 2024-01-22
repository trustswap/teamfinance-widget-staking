import { Combobox as HeadlessCombobox, Transition } from '@headlessui/react'
import classNames from 'classnames'
import Image from 'next/image'
import React, { useState } from 'react'
import { BiCheck } from 'react-icons/bi'
import { HiChevronUpDown } from 'react-icons/hi2'

import { Typography } from '../Typography'

export interface Entry {
  id: number
  name: string
  value?: string
  icon?: string
  selected?: boolean
  href?: string
}

export interface ComboboxProps {
  className?: string
  label?: string
  onSelect: (entry: Entry) => void
  data: Entry[]
}

export function Combobox({ className, label, onSelect, data }: ComboboxProps) {
  const [query, setQuery] = useState('')
  const [selectedEntry, setSelectedEntry] = useState<Entry | undefined>(
    data.find((item) => item.selected)
  )

  const filteredPeople =
    query === ''
      ? data
      : data.filter(
          (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item?.value?.toLowerCase().includes(query.toLowerCase())
        )

  return (
    <HeadlessCombobox
      as="div"
      className={classNames(className, 'z-10')}
      value={selectedEntry}
      onChange={(value: Entry) => {
        setSelectedEntry(value)
        onSelect(value)
      }}
      disabled={data.length === 0}
    >
      {label && (
        <HeadlessCombobox.Label className="block">
          <Typography variant="paragraph-small">{label}</Typography>
        </HeadlessCombobox.Label>
      )}
      <div className="relative">
        <HeadlessCombobox.Input
          className="h-10 w-full rounded-md border border-gray-200 bg-white py-2 pl-3 pr-10 text-sm text-gray-700 caret-gray-700 shadow-sm transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(item: Entry) => item?.name}
          placeholder={
            data.length === 0 ? 'No tokens available' : 'Select token'
          }
        />
        <HeadlessCombobox.Button
          className="absolute inset-y-0 right-0 m-1 flex items-center rounded px-1 transition hover:bg-gray-100 focus:outline-none disabled:cursor-not-allowed disabled:hover:bg-transparent"
          onClick={() => {
            setQuery('')
          }}
        >
          <HiChevronUpDown
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </HeadlessCombobox.Button>

        {filteredPeople.length > 0 && (
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <HeadlessCombobox.Options className="absolute z-30 mt-1 max-h-56 w-full space-y-0.5 overflow-auto rounded-md bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.map((item) => (
                <HeadlessCombobox.Option
                  key={item.id}
                  value={item}
                  className={({ active }) =>
                    classNames(
                      'relative cursor-pointer select-none rounded-md p-2',
                      active ? 'bg-blue-lm-5' : 'text-gray-900'
                    )
                  }
                >
                  {({ selected }) => (
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {item.icon && (
                          <Image
                            src={item.icon}
                            className="h-5 w-5 flex-shrink-0"
                            width={24}
                            height={24}
                            alt="Icon"
                          />
                        )}
                        <span
                          className={classNames(
                            'truncate',
                            selected && 'font-semibold'
                          )}
                        >
                          {item.name}
                        </span>
                      </div>
                      {selected && <BiCheck className="text-blue-lm h-5 w-5" />}
                    </div>
                  )}
                </HeadlessCombobox.Option>
              ))}
            </HeadlessCombobox.Options>
          </Transition>
        )}
      </div>
    </HeadlessCombobox>
  )
}

Combobox.defaultProps = {
  className: undefined,
  label: undefined,
}
