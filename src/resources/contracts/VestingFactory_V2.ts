import { Contract } from 'ethers'

import { VestingFactoryV2ABI } from '../abi'

export default class VestingFactoryV2 extends Contract {
  constructor(address: string, provider: any) {
    super(address, VestingFactoryV2ABI, provider)
  }
}
