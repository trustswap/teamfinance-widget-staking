/* eslint-disable no-nested-ternary */
import React from 'react'

import { Widget } from '../components/widget'

export default function TestWidget() {
  const supportedChains: any[] = [
    {
      name: 'Binance Smart Chain',
      chainId: '0x38',
      icon: 'https://assets.coingecko.com/coins/images/825/standard/bnb-icon2_2x.png?169650197',
      rpcUrls: ['https://bsc-dataseed.binance.org'],
      nativeCurrency: {
        name: 'Binance Smart Chain',
        symbol: 'BNB',
        decimals: 18,
      },
      blockExplorerUrls: ['https://bscscan.com'],
      type: 'mainnet',
      contractAddress: '0x101119A32aFb86D3fAD674baE0a8dC9EE5f69CEE',
      poolId: 0,
    },
    {
      name: 'BSC Testnet',
      chainId: '0x61',
      icon: 'https://assets.coingecko.com/coins/images/825/standard/bnb-icon2_2x.png?169650197',
      rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
      nativeCurrency: {
        name: 'Binance Smart Chain',
        symbol: 'BNB',
        decimals: 18,
      },
      blockExplorerUrls: ['https://testnet.bscscan.com'],
      type: 'testnet',
      contractAddress: '0x101119A32aFb86D3fAD674baE0a8dC9EE5f69CEE',
      poolId: 0,
    },
  ]

  return (
    <div className="grid min-h-screen grid-cols-2 gap-4 bg-[#505050]">
      <div className="text-white">
        <p className="mb-5 pl-5 pt-10 text-5xl text-white">
          User Content Title!
        </p>
        <p className="pl-5 pt-2 text-white">
          User content can be here... User content can be here...
        </p>
        <p className="pl-5 pt-2 text-white">
          User content can be here... User content can be here...
        </p>
        <p className="pl-5 pt-2 text-white">
          User content can be here... User content can be here...
        </p>
        <p className="pl-5 pt-2 text-white">
          User content can be here... User content can be here...
        </p>
        <p className="pl-5 pt-2 text-white">
          User content can be here... User content can be here...
        </p>
        <p className="pl-5 pt-2 text-white">
          User content can be here... User content can be here...
        </p>
      </div>

      <div className="flex justify-end bg-[#505050]">
        <Widget
          title="Swap Staking Pool 1"
          supportedChains={supportedChains}
          globalMaxAmount={40}
        />
      </div>
    </div>
  )
}
