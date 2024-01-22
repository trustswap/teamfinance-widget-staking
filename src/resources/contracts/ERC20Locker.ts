import { Contract } from 'ethers'

import ERC20LockerAbi from '../abi/ERC20Locker.json'

export default class ERC20Locker extends Contract {
  constructor(address: string, provider: any) {
    super(address, ERC20LockerAbi, provider)
  }
}
