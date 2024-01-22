import { Contract } from 'ethers'

import TokenLockerAbi from '../abi/TokenLocker.json'

export default class TokenLocker extends Contract {
  constructor(address: string, provider: any) {
    super(address, TokenLockerAbi, provider)
  }
}
