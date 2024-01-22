import { ContractFactory } from 'ethers'

import { TaxableTeamTokenAbi } from '../../abi/mint'
import { taxableTeamTokenBytecode } from '../../bytecode'

export default class TaxToken extends ContractFactory {
  constructor(provider: any) {
    super(TaxableTeamTokenAbi, taxableTeamTokenBytecode, provider)
  }
}
