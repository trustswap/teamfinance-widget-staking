import { Dialog, Transition } from '@headlessui/react'
import classNames from 'classnames'
import React, { Fragment } from 'react'
import { BiX } from 'react-icons/bi'

import { Typography } from '../Typography'

export interface ModalProps {
  className?: string
  title?: string
  isLoading?: boolean
  open: boolean
  setOpen: (state: boolean) => void
  children: React.ReactNode
}

export function Modal({
  className,
  title,
  isLoading,
  open,
  setOpen,
  children,
}: ModalProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:items-end sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={classNames(
                className,
                'relative inline-block w-fit max-w-3xl transform rounded-xl bg-white p-6 text-left shadow-xl transition-all sm:align-middle',
                {
                  'bg-gradient-to-r from-[#0876DD] to-[#2A32EF] text-white':
                    isLoading,
                }
              )}
            >
              {!title && (
                <div className="absolute right-0 top-0 block pr-4 pt-4">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-white focus:outline-none"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <BiX
                      className={classNames(
                        'text-black-65 h-7 w-7 hover:text-neutral-700',
                        {
                          'text-white/60 hover:text-neutral-300': isLoading,
                        }
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              )}
              {title && (
                <div className="mb-4 flex items-center justify-between">
                  <Typography className="" variant="title-3">
                    {title}
                  </Typography>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-white focus:outline-none"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <BiX
                      className={classNames(
                        'text-black-65 h-7 w-7 hover:text-neutral-700',
                        {
                          'text-white/60 hover:text-neutral-300': isLoading,
                        }
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              )}
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

Modal.defaultProps = {
  className: undefined,
  title: undefined,
  isLoading: false,
}
