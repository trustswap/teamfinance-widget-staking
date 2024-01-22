import { RadioGroup } from '@headlessui/react'
import classNames from 'classnames'
import { BigNumber, constants, Contract, ethers } from 'ethers'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { BiX } from 'react-icons/bi'
import { useAccount, useSigner } from 'wagmi'

import useWagmi from '../../hooks/useWagmi'
import { ERC20 } from '../../resources/contracts'
import { Badge, Button, Input, Typography } from '../../ui'
import { formatNumber } from '../../utils'
import CustomSwitch from '../CustomSwitch'
import Modal from '../Modal'
import ModalWallets from '../WalletMenu/ModalWallets'
import StakingData from './StakingData'

interface StakingPercentage {
  value: number
  label: string
}

const StakingPercentages: StakingPercentage[] = [
  { value: 0.25, label: '25%' },
  { value: 0.5, label: '50%' },
  { value: 0.75, label: '75%' },
  { value: 1, label: 'MAX' },
]

interface StakeInfoProps {
  poolId: number
  maxStakingAmount?: number
  blockPeriod?: number
}

export default function StakingInfo({
  poolId,
  maxStakingAmount,
  blockPeriod,
}: StakeInfoProps) {
  const wagmi = useWagmi()
  const { data: signer } = useSigner()
  const { address } = useAccount()
  const SECONDS_PER_YEAR = 31536000

  const [totalRewards, setTotalRewards] = useState(250000.0)
  const [apy, setApy] = useState('-')
  const [userRewards, setUserRewards] = useState('-')
  const [startDate, setStartDate] = useState('12 Mar 2023 3:50 UTC +4')
  const [endDate, setEndDate] = useState('12 Jum 2023 3:50 UTC +4')
  const [userBalance, setUserBalance] = useState('0')
  const [amount, setAmountState] = useState('')
  const [show, setShow] = useState(false)
  const [modalApproveOpen, setModalApproveOpen] = useState(false)
  const [modalStakeOpen, setModalStakeOpen] = useState(false)
  const [modalUnstakeOpen, setModalUnstakeOpen] = useState(false)

  const [stakingToken, setStakingToken] = useState(null)
  const [isApproved, setIsApproved] = useState(false)
  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const [userTokenAllowance, setUserTokenAllowance] = useState(
    BigNumber.from(0)
  )
  const [stakingPercentage, setStakingPercentage] = useState({
    value: -1,
    label: '',
  })
  const [userStakedAmount, setUserStakedAmount] = useState('')
  const [totalStaked, setTotalStaked] = useState('')
  const [walletConnected, setWalletConnected] = useState(false)
  const [isButtonDisabled, setButtonDisabled] = useState(true)
  const [isButtonClaimDisabled, setButtonClaimDisabled] = useState(true)
  const [isButtonApproveDisabled, setButtonApproveDisabled] = useState(false)
  const [transactionHash, setTransactionHash] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const setAmount = (value: string) => {
    setAmountState(value)
    try {
      console.log('part1', !(parseFloat(value) > 0))
      console.log('part2', parseFloat(userBalance) < parseFloat(value))
      console.log('part3', parseFloat(userStakedAmount) < parseFloat(value))

      console.log(
        'time restriction',
        blockPeriod && blockPeriod > new Date().getTime() / 1000
      )
      console.log(
        'ammount restriction',
        maxStakingAmount && parseFloat(value) > maxStakingAmount
      )

      setButtonDisabled(
        (blockPeriod && blockPeriod > new Date().getTime() / 1000) ||
          Number.isNaN(parseFloat(value)) ||
          (maxStakingAmount && parseFloat(value) > maxStakingAmount) ||
          !(parseFloat(value) > 0) ||
          parseFloat(userBalance) < parseFloat(value)
      )

      setButtonClaimDisabled(
        Number.isNaN(parseFloat(value)) ||
          !(parseFloat(value) > 0) ||
          parseFloat(userStakedAmount) < parseFloat(value)
      )

      setButtonApproveDisabled(
        Number.isNaN(parseFloat(value)) || !(parseFloat(value) > 0)
      )
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (address) {
      setWalletConnected(true)
    } else {
      setWalletConnected(false)
    }
  }, [address])

  const updateApproved = async () => {
    try {
      const [tokenAllowance, balance] =
        await wagmi.Token.getAllowanceAndBalance(
          address,
          stakingToken.address,
          wagmi.Contracts.rewardsServiceContract.address
        )
      setUserTokenAllowance(tokenAllowance)
      const bal = formatNumber(
        Number(ethers.utils.formatUnits(balance, stakingToken.decimals))
      )
      setUserBalance(bal.toString())
    } catch (e) {
      console.log(e)
    }
  }

  const handleOpenConnectWallet = () => {
    setWalletModalOpen(true)
  }

  const calculateAPR = (pool: any, tokenDecimals: any) => {
    console.log('pool', pool)
    console.log('staked', pool.totalStaked)

    const rewardPerSecond = pool.totalReward.div(
      pool.endTime.sub(pool.startTime)
    )

    if (pool.totalStaked && !pool.totalStaked.isZero() && rewardPerSecond) {
      const formattedTotalStaked = parseFloat(
        ethers.utils.formatUnits(pool.totalStaked, tokenDecimals)
      )
      console.log('rewardPerSecond', rewardPerSecond.toString())
      console.log('formated', formattedTotalStaked)
      const APR = `${formatNumber(
        Math.round(
          ((rewardPerSecond / formattedTotalStaked) * SECONDS_PER_YEAR * 100) /
            10 ** tokenDecimals
        )
      ).toString()}%`
      return APR
    }
    return null
  }

  useEffect(() => {
    const fetchIsApproved = async () => {
      try {
        const formattedAmount = ethers.utils.parseUnits(
          amount,
          stakingToken.decimals
        )

        console.log('formattedAmmount', formattedAmount.toString())
        const aprov = userTokenAllowance.gte(formattedAmount)
        console.log('isApproved', aprov)
        setIsApproved(aprov)
      } catch (e) {
        console.log(e)
      }
    }
    if (stakingToken && amount && userTokenAllowance && userBalance) {
      fetchIsApproved()
    }
  }, [isApproved, stakingToken, userBalance, amount, userTokenAllowance])

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const res = await wagmi.Reader.getPoolAndUserInfo(
          address,
          BigNumber.from(poolId)
        )
        const userInfo = res[0]
        const pendingReward = res[1]
        const poolInfo = res[2]

        const stakingTokenAddress = poolInfo.stakingToken
        const [tokenAllowance, balance] =
          await wagmi.Token.getAllowanceAndBalance(
            address,
            stakingTokenAddress,
            wagmi.Contracts.rewardsServiceContract.address
          )

        const token = await wagmi.Token.getToken(stakingTokenAddress)

        console.log(
          'USE tokenAllowance',
          tokenAllowance.toString(),
          tokenAllowance
        )
        console.log('USE user balance', balance.toString())
        console.log('USE token', token)
        const bal = formatNumber(
          Number(ethers.utils.formatUnits(balance, token.decimals))
        )

        const APR = calculateAPR(poolInfo, token.decimals)
        console.log('APR', APR)

        const userAmountStaked = formatNumber(
          Number(ethers.utils.formatUnits(userInfo.amount, token.decimals))
        )

        const pools = await wagmi.Reader.getPools()
        console.log(pools)
        const formattedTotalRewards = parseFloat(
          ethers.utils.formatUnits(poolInfo.totalReward, token.decimals)
        )

        const reward = formatNumber(
          Number(ethers.utils.formatUnits(pendingReward, token.decimals))
        )

        const totalStakedFormated = formatNumber(
          Number(ethers.utils.formatUnits(poolInfo.totalStaked, token.decimals))
        )

        console.log(reward)
        setStakingToken(token)
        setApy(APR)
        setStartDate(
          moment(poolInfo.startTime * 1000).format('MM/DD/YYYY HH:mm') ?? '-'
        )
        setEndDate(
          moment(poolInfo.endTime * 1000).format('MM/DD/YYYY HH:mm') ?? '-'
        )
        setTotalRewards(formattedTotalRewards)
        setUserBalance(bal.toString())
        setUserRewards(reward.toString())
        setUserTokenAllowance(tokenAllowance)
        setUserStakedAmount(userAmountStaked.toString())
        setTotalStaked(totalStakedFormated.toString())
      } catch (error) {
        console.error(error)
        setErrorMessage('Staking Pool Contract not found')
      }
    }
    if (address) {
      fetchUserStats()
    } else {
      setStakingToken(null)
      setApy('-')
      setStartDate('-')
      setEndDate('-')
      setTotalRewards(0)
      setUserBalance('-')
      setUserRewards('-')
      setUserTokenAllowance(BigNumber.from(0))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  const handleClick = (buttonValue: StakingPercentage) => {
    setStakingPercentage(buttonValue)
    let balanceToCalc = userStakedAmount
    if (!show) {
      balanceToCalc = userBalance
    }
    console.log('balance to Calc:', balanceToCalc)
    setAmount(
      (
        parseFloat(balanceToCalc.replaceAll(',', '.')) * buttonValue.value
      ).toString()
    )
  }

  const estimateGas = async (
    contract: Contract,
    params: any[],
    functionName: string
  ): Promise<BigNumber> => {
    try {
      const gasLimit = await contract.estimateGas[functionName](...params)
      return gasLimit.mul(120).div(100)
    } catch (error) {
      console.log(`error estimating gas for function ${functionName}`, error)
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({
        message: 'Error occurred in estimating gas',
      })
      // return getDefaultGasLimit(functionName)
    }
  }

  const handleClaim = async () => {
    try {
      setTransactionHash('')
      setModalUnstakeOpen(true)
      const formattedAmount = ethers.utils.parseUnits(
        amount,
        stakingToken.decimals
      )
      const tx = await wagmi.Transaction.send({
        functionName: 'withdraw',
        args: [formattedAmount, BigNumber.from(poolId)],
      })
      console.log(tx)
      await tx.wait()
      setTransactionHash(tx.hash)
      console.log('success')
    } catch (e) {
      console.log(e)
    }
    setModalUnstakeOpen(false)
  }

  const handleApproveToken = async () => {
    try {
      if (!isApproved) {
        setTransactionHash('')
        setModalApproveOpen(true)
        const ERC20Contract = new ERC20(stakingToken.address, signer)
        const params = [
          wagmi.Contracts.rewardsServiceContract.address,
          constants.MaxUint256, // request to approve maximos uint256
        ]
        const gasLimit = await estimateGas(ERC20Contract, params, 'approve')
        console.log('gasLimit', gasLimit.toString())

        const tx = await ERC20Contract.approve(...params, { gasLimit })
        console.log(tx)
        await tx.wait()
        updateApproved()
        setTransactionHash(tx.hash)
      }
    } catch (e) {
      console.log(e)
    }
    setModalApproveOpen(false)
  }

  const handleStake = async () => {
    try {
      setModalStakeOpen(true)
      setTransactionHash('')
      const res = await wagmi.Reader.getPoolAndUserInfo(
        address,
        BigNumber.from(poolId)
      )
      const poolInfo = res[2]

      const stakingTokenAddress = poolInfo.stakingToken

      const [tokenAllowance, balance] =
        await wagmi.Token.getAllowanceAndBalance(
          address,
          stakingTokenAddress,
          wagmi.Contracts.rewardsServiceContract.address
        )
      console.log('tokenAllowance', tokenAllowance.toString(), tokenAllowance)
      console.log('user balance', balance.toString())
      console.log('input', amount)

      const token = await wagmi.Token.getToken(stakingTokenAddress)
      console.log(token)

      const formattedAmount = ethers.utils.parseUnits(amount, token.decimals)

      console.log('formattedAmmount', formattedAmount.toString())
      if (formattedAmount.gt(balance)) {
        console.log('no sufficients funds ')
        return
      }
      const tx = await wagmi.Transaction.send({
        functionName: 'deposit',
        args: [formattedAmount, BigNumber.from(poolId)],
      })
      console.log(tx)
      await tx.wait()
      setTransactionHash(tx.hash)
      console.log('success')
    } catch (e) {
      console.log(e)
    }
    setModalStakeOpen(false)
  }

  const renderButtons = () => {
    if (!walletConnected) {
      return <Button onClick={handleOpenConnectWallet}>Connect Wallet</Button>
    }

    if (show) {
      return (
        <Button
          onClick={handleClaim}
          disabled={Number.isNaN(parseFloat(amount)) || isButtonClaimDisabled}
        >
          Unstake {stakingToken?.symbol ?? '-'}
        </Button>
      )
    }

    if (isApproved) {
      return (
        <Button
          onClick={handleStake}
          disabled={Number.isNaN(parseFloat(amount)) || isButtonDisabled}
        >
          Stake more {stakingToken?.symbol ?? '-'}
        </Button>
      )
    }

    return (
      <Button
        onClick={handleApproveToken}
        disabled={Number.isNaN(parseFloat(amount)) || isButtonApproveDisabled}
      >
        Approve {stakingToken?.symbol ?? '-'}
      </Button>
    )
  }

  const renderBalance = () => {
    if (!show) {
      return (
        <div className="space-x-2">
          <span className="text-black/65">Balance:</span>
          <span className="text-black">
            {userBalance} {stakingToken?.symbol ?? '-'}
          </span>
        </div>
      )
    }

    return (
      <div className="space-x-2">
        <span className="text-black/65">Staked:</span>
        <span className="text-black">
          {userStakedAmount} {stakingToken?.symbol ?? '-'}
        </span>
      </div>
    )
  }

  return (
    <>
      <div className="py-3">
        <CustomSwitch show={show} setShow={(checked) => setShow(checked)} />
      </div>

      <div>
        {!show ? (
          <Typography variant="paragraph">
            Enter the amount of tokens you want to add to this staking pool
          </Typography>
        ) : (
          <Typography variant="paragraph">
            To withdraw your reward tokens, you must unstake any amount of
            tokens from the pool. It is not necessary to unstake all of your
            tokens. All tokens will be returned to the same wallet address used
            for staking.
          </Typography>
        )}
      </div>
      <StakingData
        apy={apy}
        totalRewards={totalRewards}
        stakingToken={stakingToken}
        userRewards={userRewards}
        startDate={startDate}
        endDate={endDate}
        userAmountStaked={userStakedAmount}
        totalStaked={totalStaked}
      />

      <div className="mt-3 flex flex-col">
        <p className="my-1 text-xs font-medium text-neutral-600">
          Amount to {!show ? 'stake' : 'unstake'}
        </p>
        <Input
          className="w-full text-sm sm:w-96"
          type="number"
          name="stake-amount"
          placeholder=""
          data-testid="stake-input"
          onChange={(event) => {
            setAmount(event.target.value)
          }}
          value={amount}
        />
      </div>

      <div className="mt-2 flex items-center gap-2">
        {renderBalance()}
        <RadioGroup
          value={stakingPercentage}
          onChange={(e: StakingPercentage) => {
            handleClick(e)
          }}
        >
          <RadioGroup.Label className="sr-only">
            Staking percentage
          </RadioGroup.Label>
          <div className="flex flex-row flex-wrap items-center">
            {StakingPercentages.map((value) => (
              <RadioGroup.Option
                key={value.label}
                value={value}
                className={({ checked }) =>
                  classNames(
                    {
                      'border border-blue-600': checked,
                    },
                    'mr-2 rounded-md bg-[#4687C31A] px-2 py-1 text-sm font-semibold text-blue-lm hover:cursor-pointer hover:bg-slate-200'
                  )
                }
              >
                <RadioGroup.Label as="h6" className="text-sm">
                  {value.label}
                </RadioGroup.Label>
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div className="mt-3 flex flex-col">{renderButtons()}</div>

      {transactionHash && (
        <div className="mb-1 mt-1">
          <Badge variant="green">
            Success: {transactionHash}
            <button
              type="button"
              className="text-gray-400 focus:outline-none hover:text-white"
              onClick={() => setTransactionHash('')}
            >
              <span className="sr-only">Close</span>
              <BiX
                className="h-7 w-7 text-neutral-500 hover:text-neutral-700"
                aria-hidden="true"
              />
            </button>
          </Badge>
        </div>
      )}

      {errorMessage && (
        <div className="mb-1 mt-1">
          <Badge variant="red">
            Error: {errorMessage}
            <button
              type="button"
              className="text-gray-400 focus:outline-none hover:text-white"
              onClick={() => setErrorMessage('')}
            >
              <span className="sr-only">Close</span>
              <BiX
                className="h-7 w-7 text-neutral-500 hover:text-neutral-700"
                aria-hidden="true"
              />
            </button>
          </Badge>
        </div>
      )}

      <Modal setOpen={setModalApproveOpen} open={modalApproveOpen}>
        <Typography variant="title-2">
          Approve {stakingToken?.symbol ?? '-'}
        </Typography>
        <Typography variant="title-4">
          Wait until the blockchain process your request
        </Typography>
      </Modal>

      <Modal setOpen={setModalStakeOpen} open={modalStakeOpen}>
        <Typography variant="title-2">
          Staking {stakingToken?.symbol ?? '-'}
        </Typography>
        <Typography variant="title-4">
          Wait until the blockchain process your request
        </Typography>
      </Modal>

      <Modal setOpen={setModalUnstakeOpen} open={modalUnstakeOpen}>
        <Typography variant="title-2">
          Unstaking {stakingToken?.symbol ?? '-'}
        </Typography>
        <Typography variant="title-4">
          Wait until the blockchain process your request
        </Typography>
      </Modal>

      <ModalWallets
        title="Select wallet"
        open={walletModalOpen}
        setOpen={setWalletModalOpen}
      />
    </>
  )
}
