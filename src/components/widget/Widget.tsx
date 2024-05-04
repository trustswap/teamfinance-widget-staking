// import TfLogo from '../../../public/images/footer/tf-wordmark-primary-blue.svg'
// import TfLogo from '@img/footer/tf-wordmark-primary-blue.svg'
import classNames from 'classnames'
import Image from 'next/image'
import React from 'react'
import { WagmiConfig } from 'wagmi'

import TrustSwapLogo from '../../../public/images/footer/tf-wordmark-primary-blue.svg'
import { ChainType } from '../../connection'
import { wagmiClient } from '../../connection/wagmi'
import { AutoLink, Typography } from '../../ui'
import WalletMenu from '../WalletMenu/WalletMenu'
import StakingInfo from './StakingInfo'

interface WidgetProps {
  title: string
  className?: string
  maxStakingAmount?: number
  stakeOnlyOnce?: boolean
  supportedChains: ChainType[]
  globalMaxAmount?: number
}

export default function Widget({
  className,
  title,
  maxStakingAmount,
  stakeOnlyOnce,
  supportedChains,
  globalMaxAmount,
}: WidgetProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <div
        className={classNames(
          className,
          /* 'relative inline-block w-fit max-w-3xl transform rounded-xl bg-[#F6F6FA] p-10 mt-2 ml-2 text-left shadow-xl transition-all sm:align-middle' */
          // 'container m-2 inline-block max-w-prose rounded-xl bg-[#F6F6FA] p-5 text-left shadow-xl '
          'container m-2 inline-block max-h-[calc(98vh)] max-w-[calc(77vh)] overflow-y-auto rounded-xl bg-[#F6F6FA] p-5 text-left shadow-xl'
          // 'box-border h-[96vh] w-full p-4 border-4 inline-block max-w-prose rounded-xl bg-[#F6F6FA] p-5 text-left shadow-xl justify-between"'
        )}
      >
        <div className="flex items-center justify-between">
          <Typography className="" variant="title-4">
            {title}
          </Typography>
          <WalletMenu supportedChainsList={supportedChains} />
        </div>
        <StakingInfo
          maxStakingAmount={maxStakingAmount}
          stakeOnlyOnce={stakeOnlyOnce}
          supportedChains={supportedChains}
          globalMaxAmount={globalMaxAmount}
        />

        <div className="mt-1 flex items-center border-t border-gray-200 pb-2 pt-4">
          <p className="mr-2 text-base text-black-65">Powered by </p>
          <AutoLink href="https://team.finance">
            <Image alt="trustswap-logo" src={TrustSwapLogo} />
          </AutoLink>
        </div>
      </div>
    </WagmiConfig>
  )
}
