import { ContractFactory } from 'ethers'

import { BurnableTokenAbi } from '../../abi/mint'
import { burnableTeamTokenBytecode } from '../../bytecode'

export default class BurnableToken extends ContractFactory {
  constructor(provider: any) {
    super(BurnableTokenAbi, burnableTeamTokenBytecode, provider)
  }
}
