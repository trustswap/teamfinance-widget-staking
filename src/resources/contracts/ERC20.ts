import { Contract } from 'ethers'

import { ERC20ABI } from '../abi'

export default class ERC20 extends Contract {
  constructor(address: string, provider: any) {
    super(address, ERC20ABI, provider)
  }
}
