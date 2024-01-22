import { Contract } from 'ethers'

import RewardLockerAbi from '../abi/RewardTokenLocker.json'

export default class RewardLocker extends Contract {
  constructor(address: string, provider: any) {
    super(address, RewardLockerAbi, provider)
  }
}
