import { Typography } from '../../ui'
import { blockchainByChainId } from '../../utils'

interface StakingDataProps {
  apy: string
  totalRewards: number
  stakingToken: any
  userRewards: string
  startDate: string
  endDate: string
  userAmountStaked: string
  totalStaked: string
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
}: StakingDataProps) {
  return (
    <>
      <div className="mb-3 mt-3 grid grid-cols-2 gap-4">
        <div>
          <Typography variant="caption-2">
            Blockchain
          </Typography>
          <Typography variant="paragraph">
            {blockchainByChainId('0x61')}
          </Typography>
        </div>
        <div>
          <Typography variant="caption-2">
            APY
          </Typography>
          <Typography variant="paragraph">
            {apy}
          </Typography>
        </div>
      </div>
      <div className="mb-3 grid grid-cols-2 gap-4">
        <div>
          <Typography variant="caption-2">
            Total Rewards
          </Typography>
          <Typography variant="paragraph">
            {totalRewards} {stakingToken?.symbol ?? '-'}
          </Typography>
        </div>
        <div>
          <Typography variant="caption-2">
            Your Reward
          </Typography>
          <Typography variant="paragraph">
            {userRewards} {stakingToken?.symbol ?? '-'}
          </Typography>
        </div>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-4">
        <div>
          <Typography variant="caption-2">
            Total Staked
          </Typography>
          <Typography variant="paragraph">
            {totalStaked} {stakingToken?.symbol ?? '-'}
          </Typography>
        </div>
        <div>
          <Typography variant="caption-2">
            Your stake
          </Typography>
          <Typography variant="paragraph">
            {userAmountStaked} {stakingToken?.symbol ?? '-'}
          </Typography>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Typography variant="caption-2">
            Start Date
          </Typography>
          <Typography variant="paragraph">
            {startDate}
          </Typography>
        </div>
        <div>
          <Typography variant="caption-2">
            End Date
          </Typography>
          <Typography variant="paragraph">
            {endDate}
          </Typography>
        </div>
      </div>
    </>
  )
}
