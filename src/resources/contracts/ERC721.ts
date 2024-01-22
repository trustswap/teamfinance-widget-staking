import { Contract } from 'ethers'

import { ERC721ABI } from '../abi'

export default class ERC721 extends Contract {
  constructor(address: string, provider: any) {
    super(address, ERC721ABI, provider)
  }
}
