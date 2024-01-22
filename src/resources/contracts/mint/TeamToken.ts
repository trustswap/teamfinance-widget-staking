import { ContractFactory } from 'ethers'

import { TeamTokenAbi } from '../../abi/mint'
import { teamTokenBytecode } from '../../bytecode'

export default class TeamToken extends ContractFactory {
  constructor(provider: any) {
    super(TeamTokenAbi, teamTokenBytecode, provider)
  }
}
