# teamfinance-widget-staking
Team Finance Staking Widget

## What's inside?

This turborepo uses [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager.

### Packages

- `eslint-config`: `eslint` configurations
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `types`: collection of shared types
- `ui`: a React component library
- `utils`: collection of shared utilities

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Setup

### Install Dependencies

To install all dependencies, use the following command **at root level**:

```
yarn install
```

### Build

To build all apps and packages, use the following command **at root level**:

```
yarn build
```

### Run

To run all apps and packages, run the following command **at root level**:

```
yarn dev
```

## Team Finance Staking Widget component 

######   the widget component has all the necessary parts to integrate with team finance staking pools. it already includes the following features:

 - Smart Contract integration container
 - Wallet select and connection to the Widget
 - Support for different chains
 - Approve ERC20 token transfer
 - Stake ERC20 tokens
 - Unstake ERC20 tokens + rewards
 - Customize the Widget look and feel through Tailwind CSS

##### Example of usage:
```javascript
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
          maxStakingAmount={1000}
          supportedChains={supportedChains}
        />
      </div>
    </div>
  )
}

```

##### Widget props
| Propertie name  | description   |
| :------------: | :------------: |
| title  | Ttile of the widget  |
| globalMaxAmount | (optional) set the max amount of tokens global on the pool (for all users) | 
| maxStakingAmount |  (optional) set the max amount of tokens that the each user can stake |
| stakeOnlyOnce |  (optional) Boolean, if true: Blocks users to stake if they already have staked |
| supportedChains | The list of objects for the supported chains (see supportedChain Object|
| classNames | (optional) Tailwind css classes to customize the look and feel |


##### Supported chain object
```javascript
export interface SupportedChain{
  name: string
  chainId: string
  icon: string
  rpcUrls: [string]
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  blockExplorerUrls: [string]
  contractAddress: string
  type: string
  poolId:number
}
```
| Propertie name  | description   |
| :------------: | :------------: |
| name  | Name of the chain   |
| chainId  | Chain Id in hexadecimal format  |
| icon  | Chain icon URI|
| rpcURL | Chain RPC Urls |
| nativeCurrency | Object of the native Currency of the chain including name, symbol and decimals|
| blockExplorerUrls | Chain Block explorer URL|
|  contractAddress | Staking Pool contract address|
|  type | type of the chain (mainnet or testnet)
|   poolId | Id of the Staking pool |

##### Supported chain object Example
```javascript
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
```
