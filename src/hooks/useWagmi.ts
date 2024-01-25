import { BigNumber } from 'ethers'
import { useNetwork } from 'wagmi'
import {
  fetchToken,
  FetchTokenResult,
  multicall,
  prepareWriteContract,
  SendTransactionResult,
  writeContract,
} from 'wagmi/actions'

import { ERC20ABI } from '../resources/abi/ERC20'
import RewardsServiceNewABI from '../resources/abi/reward-service-new-abi'

type FunctionParams = {
  functionName: any
  args: any
}

/**
 *
 * Hook for extracting WAGMI logic to a single component
 *
 * 1. Transaction - Write functions
 *
 * 2. Reader - Read functions
 *
 * 3. Token - Token Info functions
 *
 * 4. Contracts - initialized contracts
 *
 */
export const useWagmi = () => {
  const { chain } = useNetwork()

  const rewardsServiceContract = {
    address: '',
    abi: RewardsServiceNewABI,
  }


  const setContractAddress = (contractAddress:string) => {
    rewardsServiceContract.address = contractAddress
  }

  /**
   * READ POOL -------------------------------------
   */
  const getPoolAndUserInfo = async (
    address: any,
    pool_id: BigNumber
  ): Promise<any> => {
    const [userInfo, pendingReward, poolInfo] = await multicall({
      chainId: chain?.id,
      contracts: [
        {
          ...rewardsServiceContract,
          functionName: 'userInfo',
          args: [address, pool_id],
        },
        {
          ...rewardsServiceContract,
          functionName: 'pendingReward',
          args: [address, pool_id],
        },
        {
          ...rewardsServiceContract,
          functionName: 'poolInfo',
          args: [pool_id],
        },
      ] as any,
    })
    return [userInfo, pendingReward, poolInfo]
  }

  const getPools = async (): Promise<any> => {
    const pools = await multicall({
      chainId: chain?.id,
      contracts: [
        {
          ...rewardsServiceContract,
          functionName: 'getPools',
          args: [],
        },
      ] as any,
    })
    return pools
  }
  /**
   *
   * Write Contract
   *
   */
  const send = async (
    params: FunctionParams
  ): Promise<SendTransactionResult> => {
    const config = await prepareWriteContract({
      address: rewardsServiceContract.address as any,
      abi: RewardsServiceNewABI,
      functionName: params.functionName,
      chainId: chain?.id,
      args: params.args,
    })

    // send tx
    const tx = await writeContract(config)
    return tx
  }

  /**
   *
   * @param tokenAddress token to query
   * @returns FetchTokenResult
   */
  const getToken = async (tokenAddress: any): Promise<FetchTokenResult> => {
    const token = await fetchToken({
      address: tokenAddress,
      chainId: chain?.id,
      formatUnits: 'ether',
    })
    return token
  }

  /**
   *
   * @param address account address
   * @param tokenAddress token to query
   * @param spender spender's address
   * @returns [allowance, balance] for tokenAddress
   */
  const getAllowanceAndBalance = async (
    address: any,
    tokenAddress: any,
    spender: any
  ): Promise<any> => {
    const [allowance, balance] = await multicall({
      chainId: chain?.id,
      contracts: [
        {
          address: tokenAddress,
          abi: ERC20ABI,
          functionName: 'allowance',
          args: [address, spender],
        },
        {
          address: tokenAddress,
          abi: ERC20ABI,
          functionName: 'balanceOf',
          args: [address],
        },
      ],
    })

    return [allowance, balance]
  }

  /**
   *
   * @param tokenAddress token to approve
   * @param spender spender to approve for
   * @returns max allowance for signer
   */
  const approve = async (
    tokenAddress: any,
    spender: any
  ): Promise<SendTransactionResult> => {
    const config = await prepareWriteContract({
      address: tokenAddress,
      abi: ERC20ABI,
      functionName: 'approve',
      chainId: chain?.id,
      args: [spender, BigNumber.from(2).pow(256).sub(1)],
    })

    const tx = await writeContract(config)
    return tx
  }

  /**
   * Methods for contract reads and multicalls
   */
  const Reader = {
    getPoolAndUserInfo,
    getPools,
  }

  /**
   *Stores contract address and abi
   */
  const Contracts = {
    rewardsServiceContract,
  }

  /**
   * Methods for Token queries
   */
  const Token = {
    getToken,
    getAllowanceAndBalance,
  }

  /**
   * Transaction methods
   * call setParams() to prepare Tx
   */
  const Transaction = {
    send,
    approve,
  }

  return { Transaction, Contracts, Reader, Token , setContractAddress }
}

export default useWagmi
