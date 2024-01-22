import Image from 'next/image'
import React, { ReactNode } from 'react'

import { AutoLink } from '../AutoLink'
import { Button } from '../Button'

export interface TableProps {
  topbar?: ReactNode
  header?: string[]
  data?: Record<string, string>[]
}

export function Table({ topbar, header, data }: TableProps) {
  const Topbar = () => topbar as JSX.Element

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden rounded-xl border border-gray-200">
          {topbar && <Topbar />}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {header ? (
                <tr>
                  {header.map((item) => (
                    <th
                      key={item}
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold uppercase text-gray-900 sm:pl-6"
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              ) : (
                <tr>
                  <td className="py-6 pl-4 pr-3 text-left text-sm font-semibold uppercase text-gray-900 sm:pl-6" />
                </tr>
              )}
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data ? (
                data.map((item) => (
                  <tr key={item.ticker}>
                    <td className="flex flex-col whitespace-nowrap py-4 pl-4 pr-3 font-medium text-gray-600 sm:pl-6">
                      <span className="text-base font-semibold text-black">
                        {item.name}
                      </span>
                      <span className="text-sm">{item.ticker}</span>
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-600 sm:pl-6">
                      {item.blockchain}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-600 sm:pl-6">
                      {item.liquidityLocked}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-600 sm:pl-6">
                      <div className="flex items-center space-x-2">
                        <Image
                          src="/logos/coingecko.svg"
                          width={23}
                          height={23}
                          alt="Coingecko Logo"
                        />
                        <span className="mt-0.5">{item.coingeckoRanking}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-600 sm:pl-6">
                      {item.tokensLocked}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-600 sm:pl-6">
                      {item.valueLocked}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-600 sm:pl-6">
                      {item.nextUnlock}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <AutoLink
                        href="/view-coin"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View<span className="sr-only">, {item.name}</span>
                      </AutoLink>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-32 text-center" colSpan={header?.length}>
                    {/* Neutral Empty State */}
                    {/* <div className="flex flex-col items-center space-y-1 text-gray-400"> */}
                    {/*  <FaInbox size={40} /> */}
                    {/*  <h3 className="text-xl font-medium">No Data</h3> */}
                    {/* </div> */}
                    <h3 className="font-medium text-gray-900">No locks</h3>
                    <p className="mb-2 text-sm text-gray-500">
                      Connect wallet to proceed.
                    </p>
                    <Button size="sm">Connect Wallet</Button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

Table.defaultProps = {
  topbar: undefined,
  header: undefined,
  data: undefined,
}
