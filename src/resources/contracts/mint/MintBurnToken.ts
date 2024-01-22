import { ContractFactory } from 'ethers'

import { MintBurnTokenAbi } from '../../abi/mint'
import { mintBurnTeamTokenBytecode } from '../../bytecode'

export default class MintBurnToken extends ContractFactory {
  constructor(provider: any) {
    super(MintBurnTokenAbi, mintBurnTeamTokenBytecode, provider)
  }
}
