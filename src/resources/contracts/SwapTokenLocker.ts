import { Contract } from 'ethers'

import { SwapTokenLockerABI } from '../abi'

export default class SwapTokenLocker extends Contract {
  constructor(address: string, provider: any) {
    super(address, SwapTokenLockerABI, provider)
  }
}
