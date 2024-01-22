import { Contract } from 'ethers'

import RewardsServiceAbi from '../abi/RewardsService.json'

export default class RewardsService extends Contract {
  constructor(address: string, provider: any) {
    super(address, RewardsServiceAbi, provider)
  }
}
