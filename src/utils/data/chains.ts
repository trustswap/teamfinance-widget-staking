export const supportedChainIds = [
  1, 5, 42, 56, 97, 137, 43114, 940, 25, 128, 106, 250, 2222, 2221, 338, 61, 63,
  421613, 42161, 8453, 324, 369,
]

export interface ChainRedirectUrlType {
  chain: string
  id: string
  redirectUrl: string
}

export interface NonEvmChainType {
  name: string
  chainId: string
  icon: string
  rpcUrls: [string]
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  blockExplorerUrls: [string]
  redirectUrl: string
}

export interface ChainType {
  name: string
  chainId: string
  icon: string
  rpcUrls: [string]
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  blockExplorerUrls: [string]
  redirectUrl?: string
}

/* Actual chain definitions */
export const chainRedirectUrl: ChainRedirectUrlType[] = [
  /*
  {
    chain: 'conflux',
    id: '0x405',
    redirectUrl: 'https://conflux.team.finance',
  },
  {
    chain: 'algorand',
    id: 'algo',
    redirectUrl: 'https://algorand.team.finance',
  },
  { chain: 'casper', id: 'casper', redirectUrl: 'https://casper.team.finance' },
  { chain: 'tezos', id: 'tezos', redirectUrl: 'https://tezos.team.finance' },
  */
]


/**
 * Non-EVM chains
*/
/*
const conflux: NonEvmChainType = {
  name: 'Conflux',
  chainId: '0x405',
  icon: '/icons/wizard/conflux.svg',
  rpcUrls: ['https://evm.confluxrpc.com'],
  nativeCurrency: {
    name: 'Conflux',
    symbol: 'Conflux',
    decimals: 18,
  },
  blockExplorerUrls: ['https://evm.confluxscan.net'],
  redirectUrl: 'https://conflux.team.finance',
}

const algorand: NonEvmChainType = {
  name: 'Algorand',
  chainId: 'algo',
  icon: '/icons/wizard/algorand.svg',
  rpcUrls: [''],
  nativeCurrency: {
    name: 'Algorand',
    symbol: 'Algo',
    decimals: 18,
  },
  blockExplorerUrls: [''],
  redirectUrl: 'https://algorand.team.finance',
}

const casper: NonEvmChainType = {
  name: 'Casper',
  chainId: 'casper',
  icon: '/icons/wizard/casper.svg',
  rpcUrls: [''],
  nativeCurrency: {
    name: 'Casper Network',
    symbol: 'CSPR',
    decimals: 18,
  },
  blockExplorerUrls: ['https://cspr.live/'],
  redirectUrl: 'https://casper.team.finance',
}

const tezos: NonEvmChainType = {
  name: 'Tezos',
  chainId: 'tezos',
  icon: '/icons/wizard/tezos.svg',
  rpcUrls: [''],
  nativeCurrency: {
    name: 'Tezos',
    symbol: 'TEZ',
    decimals: 18,
  },
  blockExplorerUrls: ['https://better-call.dev/'],
  redirectUrl: 'https://tezos.team.finance',
}

export const nonEvmMainnetChainsMap = {
  conflux,
  algorand,
  casper,
  tezos,
}

export const nonEvmMainnetChains: NonEvmChainType[] = [
  conflux,
  algorand,
  casper,
  tezos,
]
  */

const confluxTestnet: NonEvmChainType = {
  name: 'Conflux Testnet',
  chainId: '0x47',
  icon: '/icons/wizard/conflux.svg',
  rpcUrls: ['https://evm.confluxrpc.com'],
  nativeCurrency: {
    name: 'Conflux',
    symbol: 'Conflux',
    decimals: 18,
  },
  blockExplorerUrls: ['https://evm.confluxscan.net'],
  redirectUrl: 'https://conflux.team.finance',
}

export const nonEvmTestnetChains: NonEvmChainType[] = [confluxTestnet]

/**
 * EVM chains
 */
const ethereum: ChainType = {
  name: 'Ethereum',
  chainId: '0x1',
  icon: '/icons/wizard/ethereum.svg',
  rpcUrls: [`https://mainnet.infura.io/v3/`],
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'Ethereum',
    decimals: 18,
  },
  blockExplorerUrls: ['https://etherscan.io'],
}

const bsc: ChainType = {
  name: 'Binance Smart Chain',
  chainId: '0x38',
  icon: '/icons/wizard/binance.svg',
  rpcUrls: ['https://bsc-dataseed.binance.org'],
  nativeCurrency: {
    name: 'Binance Smart Chain',
    symbol: 'BNB',
    decimals: 18,
  },
  blockExplorerUrls: ['https://bscscan.com'],
}

const avalanche: ChainType = {
  name: 'Avalanche',
  chainId: '0xa86a',
  icon: '/icons/wizard/avax.svg',
  rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
  },
  blockExplorerUrls: ['https://snowtrace.io'],
}

const polygon: ChainType = {
  name: 'Polygon',
  chainId: '0x89',
  icon: '/icons/wizard/polygon.svg',
  rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
  nativeCurrency: {
    name: 'Polygon',
    symbol: 'MATIC',
    decimals: 18,
  },
  blockExplorerUrls: ['https://polygonscan.com'],
}

const cronos: ChainType = {
  name: 'Cronos',
  chainId: '0x19',
  icon: '/icons/wizard/cronos.svg',
  rpcUrls: ['https://evm.cronos.org'],
  nativeCurrency: {
    name: 'Cronos',
    symbol: 'CRO',
    decimals: 18,
  },
  blockExplorerUrls: ['https://cronoscan.com'],
}

const heco: ChainType = {
  name: 'Heco',
  chainId: '0x80',
  icon: '/icons/wizard/heco.svg',
  rpcUrls: ['https://http-mainnet.hecochain.com'],
  nativeCurrency: {
    name: 'Heco-Mainnet',
    symbol: 'HT',
    decimals: 18,
  },
  blockExplorerUrls: ['https://hecoinfo.com'],
}

const velas: ChainType = {
  name: 'Velas',
  chainId: '0x6a',
  icon: '/icons/wizard/velas.svg',
  rpcUrls: ['https://evmexplorer.velas.com/rpc'],
  nativeCurrency: {
    name: 'Velas-Mainnet',
    symbol: 'VLX',
    decimals: 18,
  },
  blockExplorerUrls: ['https://evmexplorer.velas.com/rpc'],
}

const fantom: ChainType = {
  name: 'Fantom',
  chainId: '0xfa',
  icon: '/icons/wizard/fantom.svg',
  rpcUrls: ['https://rpc.ftm.tools'],
  nativeCurrency: {
    name: 'Fantom Opera',
    symbol: 'FTM',
    decimals: 18,
  },
  blockExplorerUrls: ['https://ftmscan.com'],
}

const kava: ChainType = {
  name: 'Kava',
  chainId: '0x8ae',
  icon: '/icons/wizard/kava.svg',
  rpcUrls: ['https://evm.kava.io'],
  nativeCurrency: {
    name: 'Kava',
    symbol: 'KAVA',
    decimals: 18,
  },
  blockExplorerUrls: ['https://explorer.kava.io'],
}

const ethClassic: ChainType = {
  name: 'Ethereum Classic',
  chainId: '0x3d',
  icon: '/icons/wizard/etc.svg',
  rpcUrls: ['https://www.ethercluster.com/etc'],
  nativeCurrency: {
    name: 'ETC',
    symbol: 'ETC',
    decimals: 18,
  },
  blockExplorerUrls: ['https://blockscout.com/etc/mainnet/'],
}

const pulseChain: ChainType = {
  name: 'PulseChain',
  chainId: '0x171',
  icon: '/icons/wizard/pulsechain.svg',
  rpcUrls: ['https://rpc.pulsechain.com'],
  nativeCurrency: {
    name: 'PulseChain',
    symbol: 'PLS',
    decimals: 18,
  },
  blockExplorerUrls: ['https://scan.pulsechain.com/'],
}

const baseChain: ChainType = {
  name: 'Base',
  icon: '/icons/wizard/basechain.svg',
  rpcUrls: ['https://mainnet.base.org'],
  chainId: '0x2105',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  blockExplorerUrls: ['https://base.blockscout.com/'],
}

const zkSync: ChainType = {
  name: 'zkSync',
  icon: '/icons/wizard/zksync.svg',
  rpcUrls: ['https://mainnet.era.zksync.io'],
  chainId: '0x144',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  blockExplorerUrls: ['https://explorer.zksync.io/'],
}

const arbitrum: ChainType = {
  name: 'Arbitrum',
  icon: '/icons/wizard/arbitrum.svg',
  rpcUrls: ['https://arb1.arbitrum.io/rpc'],
  chainId: '0xa4b1',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  blockExplorerUrls: ['https://arbiscan.io/'],
}

export const evmMainnetChainsMap = {
  ethereum,
  bsc,
  avalanche,
  polygon,
  cronos,
  heco,
  velas,
  fantom,
  kava,
  ethClassic,
  pulseChain,
  baseChain,
  zkSync,
  arbitrum,
}

export const evmMainnetChains: ChainType[] = [
  ethereum,
  bsc,
  avalanche,
  polygon,
  cronos,
  heco,
  velas,
  fantom,
  kava,
  ethClassic,
  pulseChain,
  baseChain,
  zkSync,
  arbitrum,
]

export const mainnetsChains = evmMainnetChains // .concat(nonEvmMainnetChains)

const goerli: ChainType = {
  name: 'Goerli',
  chainId: '0x5',
  icon: '/icons/wizard/ethereum.svg',
  rpcUrls: [`https://goerli.infura.io/v3/`],
  nativeCurrency: {
    name: 'Goerli Test Network',
    symbol: 'GoerliETH',
    decimals: 18,
  },
  blockExplorerUrls: ['https://goerli.etherscan.io'],
}

const bscTestnet: ChainType = {
  name: 'BSC Testnet',
  chainId: '0x61',
  icon: '/icons/wizard/binance.svg',
  rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
  nativeCurrency: {
    name: 'Binance Smart Chain',
    symbol: 'BNB',
    decimals: 18,
  },
  blockExplorerUrls: ['https://testnet.bscscan.com'],
}

const sepoliaTestnet: ChainType = {
  name: 'Sepolia Testnet',
  chainId: '0xaa36a7',
  icon: '/icons/wizard/ethereum.svg',
  rpcUrls: [`https://sepolia.infura.io/v3/`],
  nativeCurrency: {
    name: 'Sepolia Test Network',
    symbol: 'SepoliaETH',
    decimals: 18,
  },
  blockExplorerUrls: ['https://sepolia.etherscan.io'],
}

const kavaTestnet: ChainType = {
  name: 'Kava Testnet',
  chainId: '0x8ad',
  icon: '/icons/wizard/kava.svg',
  rpcUrls: ['https://evm.testnet.kava.io'],
  nativeCurrency: {
    name: 'Kava Test Network',
    symbol: 'KAVA',
    decimals: 18,
  },
  blockExplorerUrls: ['https://explorer.testnet.kava.io'],
}

const ethClassicTestnet: ChainType = {
  name: 'Ethereum Classic Testnet',
  chainId: '0x61',
  icon: '/icons/wizard/etc.svg',
  rpcUrls: ['https://www.ethercluster.com/etc'],
  nativeCurrency: {
    name: 'ETC',
    symbol: 'ETC',
    decimals: 18,
  },
  blockExplorerUrls: ['https://blockscout.com/etc/mainnet/'],
}

const arbitrumTestnet: ChainType = {
  name: 'Arbitrum Testnet',
  chainId: '0x66eed',
  icon: '/icons/wizard/arbitrum.svg',
  rpcUrls: ['https://arb-goerli.g.alchemy.com/v2'],
  nativeCurrency: { name: 'AGOR', symbol: 'AGOR', decimals: 18 },
  blockExplorerUrls: ['https://api-goerli.arbiscan.io'],
}

export const evmTestnetChainsMap = {
  goerli,
  bscTestnet,
  sepoliaTestnet,
  kavaTestnet,
  ethClassicTestnet,
  arbitrumTestnet,
}

export const evmTestnetChains: ChainType[] = [
  goerli,
  bscTestnet,
  sepoliaTestnet,
  kavaTestnet,
  ethClassicTestnet,
  arbitrumTestnet,
]

export const testnetsChains = evmTestnetChains.concat(nonEvmTestnetChains)
