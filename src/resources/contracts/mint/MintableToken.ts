import { ContractFactory } from 'ethers'

import { MintableTokenAbi } from '../../abi/mint'
import { mintableTeamTokenBytecode } from '../../bytecode'

export default class MintableToken extends ContractFactory {
  constructor(provider: any) {
    super(MintableTokenAbi, mintableTeamTokenBytecode, provider)
  }
}
