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
          poolId={69}
          maxStakingAmount={1000}
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
| poolId  |  Identification of the pool  |
| maxStakingAmount |  (optional) set the max amount of tokens that the user can stake |
| stakeOnlyOnce |  (optional) Boolean, if true: Blocks users to stake if they already have staked |
| blockWithdrawUntilEnd | (optional) Boolean, if true: Block users to withdraw before the pool end period |
| classNames | (optional) Tailwind css classes to customize the look and feel |



