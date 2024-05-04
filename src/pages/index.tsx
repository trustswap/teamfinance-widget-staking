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
      contractAddress: '0x12682aca91DC386e649728F6935Bc621AAcC267E',
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
      contractAddress: '0x0f2A5800f9Da5Fc765D28d64b554036b58fA8156',
      poolId: 0,
    },
  ]

  /*
  const supportedChains1: any[] = [
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
      contractAddress: '0xD98287c1A455Fe4B57Dc2932F8B6b5d8938C7255',
      poolId: 1,
    },
  ]

  const supportedChains2: any[] = [
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
      contractAddress: '0xD98287c1A455Fe4B57Dc2932F8B6b5d8938C7255',
      poolId: 2,
    },
  ]
  const supportedChains3: any[] = [
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
      contractAddress: '0xD98287c1A455Fe4B57Dc2932F8B6b5d8938C7255',
      poolId: 3,
    },
  ]
  */
 
  return (
    <div className="grid min-h-screen grid-cols-2 gap-4 bg-[#505050]">
      <div className="flex justify-end bg-[#505050]">
        <Widget title="Swap Staking Pool 0" supportedChains={supportedChains} />
      </div>
    </div>
  )
}
