import { Contract } from 'ethers'

import { VestingFactoryV3ABI } from '../abi'

export default class VestingFactoryV2 extends Contract {
  constructor(address: string, provider: any) {
    super(address, VestingFactoryV3ABI, provider)
  }
}
