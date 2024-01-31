import { useEffect, useState } from 'react'
import { useNetwork } from 'wagmi'

import { ChainType } from '../../connection'
import { Typography } from '../../ui'
import { toHex } from '../../utils'

interface StakingDataProps {
  apy: string
  totalRewards: number
  stakingToken: any
  userRewards: string
  startDate: string
  endDate: string
  userAmountStaked: string
  totalStaked: string
  supportedChains: ChainType[]
}

export default function StakingData({
  apy,
  totalRewards,
  stakingToken,
  userRewards,
  startDate,
  endDate,
  userAmountStaked,
  totalStaked,
  supportedChains,
}: StakingDataProps) {
  const { chain } = useNetwork()

  const [chainName, setChainName] = useState('-')

  useEffect(() => {
    if (chain) {
      setChainName(
        supportedChains.find(
          (userChain) => userChain.chainId === toHex(chain.id)
        )?.name ?? 'Chain not supported'
      )
    }
  }, [chain, supportedChains])

  return (
    <>
      <div className="mb-3 mt-3 grid grid-cols-2 gap-4">
        <div>
          <Typography variant="caption-2">Blockchain</Typography>
          <Typography variant="paragraph">{chainName}</Typography>
        </div>
        <div>
          <Typography variant="caption-2">APY</Typography>
          <Typography variant="paragraph">{apy}</Typography>
        </div>
      </div>
      <div className="mb-3 grid grid-cols-2 gap-4">
        <div>
          <Typography variant="caption-2">Total Rewards</Typography>
          <Typography variant="paragraph">
            {totalRewards} {stakingToken?.symbol ?? '-'}
          </Typography>
        </div>
        <div>
          <Typography variant="caption-2">Your Reward</Typography>
          <Typography variant="paragraph">
            {userRewards} {stakingToken?.symbol ?? '-'}
          </Typography>
        </div>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-4">
        <div>
          <Typography variant="caption-2">Total Staked</Typography>
          <Typography variant="paragraph">
            {totalStaked} {stakingToken?.symbol ?? '-'}
          </Typography>
        </div>
        <div>
          <Typography variant="caption-2">Your stake</Typography>
          <Typography variant="paragraph">
            {userAmountStaked} {stakingToken?.symbol ?? '-'}
          </Typography>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Typography variant="caption-2">Start Date</Typography>
          <Typography variant="paragraph">{startDate}</Typography>
        </div>
        <div>
          <Typography variant="caption-2">End Date</Typography>
          <Typography variant="paragraph">{endDate}</Typography>
        </div>
      </div>
    </>
  )
}
