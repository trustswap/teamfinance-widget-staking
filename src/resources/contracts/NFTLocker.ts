import { Contract } from 'ethers'

import NFTLockerAbi from '../abi/NFTLocker.json'

export default class NFTLocker extends Contract {
  constructor(address: string, provider: any) {
    super(address, NFTLockerAbi, provider)
  }
}
