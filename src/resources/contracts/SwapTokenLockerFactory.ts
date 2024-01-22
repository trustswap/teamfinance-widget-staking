import { Contract } from 'ethers'

import { SwapTokenLockerFactoryABI } from '../abi'

export default class SwapTokenLockerFactory extends Contract {
  constructor(address: string, provider: any) {
    super(address, SwapTokenLockerFactoryABI, provider)
  }
}
