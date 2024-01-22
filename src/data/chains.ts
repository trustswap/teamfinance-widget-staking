export interface ChainType {
  id: number
  name: string
  icon: string
  chainIds: string[]
  shortcut: string
  isTestnet: boolean
  nativeCurrency: string
  redirectUrl?: string
}

const chains: ChainType[] = [
  {
    id: 193248,
    name: 'Ethereum',
    icon: '/icons/wizard/ethereum.svg',
    chainIds: ['0x1'],
    shortcut: 'ETH',
    isTestnet: false,
    nativeCurrency: 'ETH',
  },
  {
    id: 193249,
    name: 'Goerli Testnet',
    icon: '/icons/wizard/ethereum.svg',
    chainIds: ['0x5'],
    shortcut: 'ETH',
    isTestnet: true,
    nativeCurrency: 'ETH',
  },
  {
    id: 11155111,
    name: 'Sepolia Testnet',
    chainIds: ['0xaa36a7'],
    icon: '/icons/wizard/ethereum.svg',
    shortcut: 'ETH',
    isTestnet: true,
    nativeCurrency: 'ETH',
  },
  {
    id: 809341,
    name: 'BSC',
    icon: '/icons/wizard/binance.svg',
    chainIds: ['0x38'],
    shortcut: 'BSC',
    isTestnet: false,
    nativeCurrency: 'BNB',
  },
  {
    id: 809342,
    name: 'BSC Testnet',
    icon: '/icons/wizard/binance.svg',
    chainIds: ['0x61'],
    shortcut: 'BSC',
    isTestnet: true,
    nativeCurrency: 'BNB',
  },
  {
    id: 589123,
    name: 'Avalanche',
    icon: '/icons/wizard/avax.svg',
    chainIds: ['0xa86a'],
    shortcut: 'AVAX',
    isTestnet: false,
    nativeCurrency: 'AVAX',
  },
  {
    id: 741924,
    name: 'Polygon',
    icon: '/icons/wizard/polygon.svg',
    chainIds: ['0x89'],
    shortcut: 'POLYGON',
    isTestnet: false,
    nativeCurrency: 'MATIC',
  },
  /* {
    id: 294081,
    name: 'PulseChain',
    icon: '/icons/wizard/pulsechain.svg',
    chainIds: [''],
    shortcut: 'PULSE',
    isTestnet: false,nativeCurrency: 'PLS'
  }, */
  {
    id: 847124,
    name: 'Cronos',
    icon: '/icons/wizard/cronos.svg',
    chainIds: ['0x19'],
    shortcut: 'CRONOS',
    isTestnet: false,
    nativeCurrency: 'CRO',
  },
  {
    id: 290842,
    name: 'Heco',
    icon: '/icons/wizard/heco.svg',
    chainIds: ['0x80'],
    shortcut: 'HECO',
    isTestnet: false,
    nativeCurrency: 'HECO',
  },
  {
    id: 398241,
    name: 'Velas',
    icon: '/icons/wizard/velas.svg',
    chainIds: ['0x6a'],
    shortcut: 'VELAS',
    isTestnet: false,
    nativeCurrency: 'VLX',
  },
  {
    id: 941233,
    name: 'Fantom',
    icon: '/icons/wizard/fantom.svg',
    chainIds: ['0xfa'],
    shortcut: 'FANTOM',
    isTestnet: false,
    nativeCurrency: 'FTM',
  },

  {
    id: 567432,
    name: 'Kava',
    icon: '/icons/wizard/kava.svg',
    chainIds: ['0x8ae'],
    shortcut: 'KAVA',
    isTestnet: false,
    nativeCurrency: 'Kava',
  },
  {
    id: 514397,
    name: 'Kava Testnet',
    icon: '/icons/wizard/kava.svg',
    chainIds: ['0x8ad'],
    shortcut: 'KAVA',
    isTestnet: true,
    nativeCurrency: 'KAVA',
  },
  {
    id: 924891,
    name: 'Conflux',
    icon: '/icons/wizard/conflux.svg',
    chainIds: ['0x405'],
    shortcut: 'CONFLUX',
    isTestnet: false,
    nativeCurrency: 'CFX',
    redirectUrl: 'https://conflux.team.finance/lockups',
  },
  {
    id: 924892,
    name: 'Conflux Testnet',
    icon: '/icons/wizard/conflux.svg',
    chainIds: [''],
    shortcut: 'CONFLUX',
    isTestnet: true,
    nativeCurrency: 'CFX',
    redirectUrl: 'https://conflux.team.finance/lockups',
  },
  {
    id: 924893,
    name: 'Algorand',
    icon: '/icons/wizard/algorand.svg',
    chainIds: ['algorand'],
    shortcut: 'Algorand',
    isTestnet: false,
    nativeCurrency: 'Algo',
    redirectUrl: 'https://algorand.team.finance',
  },
  {
    id: 924894,
    name: 'Ethereum Classic',
    icon: '/icons/wizard/etc.svg',
    chainIds: ['0x3d'],
    shortcut: 'ETC',
    isTestnet: false,
    nativeCurrency: 'ETC',
  },
  {
    id: 924895,
    name: 'Ethereum Classic Testnet',
    icon: '/icons/wizard/etc.svg',
    chainIds: ['0x3f'],
    shortcut: 'METC',
    isTestnet: true,
    nativeCurrency: 'METC',
  },
  {
    id: 171,
    name: 'PulseChain',
    icon: '/icons/wizard/pulsechain.svg',
    chainIds: ['0x171'],
    shortcut: 'PLS',
    isTestnet: false,
    nativeCurrency: 'PLS',
  },
  {
    id: 924896,
    name: 'Casper',
    icon: '/icons/wizard/casper.svg',
    chainIds: ['casper'],
    shortcut: 'Casper',
    isTestnet: false,
    nativeCurrency: 'CSPR',
    redirectUrl: 'https://casper.team.finance/lockups',
  },
  {
    id: 924897,
    name: 'Tezos',
    icon: '/icons/wizard/tezos.svg',
    chainIds: ['tezos'],
    shortcut: 'Tezos',
    isTestnet: false,
    nativeCurrency: 'TEZ',
    redirectUrl: 'https://tezos.team.finance',
  },
  {
    id: 42161,
    name: 'Arbitrum',
    icon: '/icons/wizard/arbitrum.svg',
    chainIds: ['0xa4b1'],
    shortcut: 'ETH',
    isTestnet: false,
    nativeCurrency: 'ETH',
  },
  {
    id: 421613,
    name: 'Arbitrum Testnet',
    icon: '/icons/wizard/arbitrum.svg',
    chainIds: ['0x66eed'],
    shortcut: 'AGOR',
    isTestnet: true,
    nativeCurrency: 'AGOR',
  },
  {
    // basechaindev
    id: 8453,
    name: 'Base',
    icon: '/icons/wizard/basechain.svg',
    chainIds: ['0x2105'],
    shortcut: 'ETH',
    isTestnet: false,
    nativeCurrency: 'ETH',
  },
  {
    id: 324,
    name: 'zkSync',
    icon: '/icons/wizard/zksync.svg',
    chainIds: ['0x144'],
    shortcut: 'ETH',
    isTestnet: false,
    nativeCurrency: 'ETH',
  },
]

export const liquidityNFTChains: ChainType[] = [
  {
    id: 193248,
    name: 'Ethereum',
    icon: '/icons/wizard/ethereum.svg',
    chainIds: ['0x1'],
    shortcut: 'ETH',
    isTestnet: false,
    nativeCurrency: 'ETH',
  },
  {
    id: 193249,
    name: 'Goerli Testnet',
    icon: '/icons/wizard/ethereum.svg',
    chainIds: ['0x5'],
    shortcut: 'ETH',
    isTestnet: true,
    nativeCurrency: 'ETH',
  },
  {
    id: 809341,
    name: 'BSC',
    icon: '/icons/wizard/binance.svg',
    chainIds: ['0x38'],
    shortcut: 'BSC',
    isTestnet: false,
    nativeCurrency: 'BNB',
  },
  {
    id: 741924,
    name: 'Polygon',
    icon: '/icons/wizard/polygon.svg',
    chainIds: ['0x89'],
    shortcut: 'POLYGON',
    isTestnet: false,
    nativeCurrency: 'MATIC',
  },
  {
    id: 42161,
    name: 'Arbitrum',
    icon: '/icons/wizard/arbitrum.svg',
    chainIds: ['0xa4b1'],
    shortcut: 'ETH',
    isTestnet: false,
    nativeCurrency: 'ETH',
  },
  {
    // basechaindev
    id: 8453,
    name: 'Base',
    icon: '/icons/wizard/basechain.svg',
    chainIds: ['0x2105'],
    shortcut: 'ETH',
    isTestnet: false,
    nativeCurrency: 'ETH',
  },
  {
    id: 324,
    name: 'zkSync',
    icon: '/icons/wizard/zksync.svg',
    chainIds: ['0x144'],
    shortcut: 'ETH',
    isTestnet: false,
    nativeCurrency: 'ETH',
  },
]

export const mintChains: ChainType[] = [
  {
    id: 193248,
    name: 'Ethereum',
    icon: '/icons/wizard/ethereum.svg',
    chainIds: ['0x1'],
    shortcut: 'ETH',
    isTestnet: false,
    nativeCurrency: 'ETH',
  },
  {
    id: 193249,
    name: 'Goerli Testnet',
    icon: '/icons/wizard/ethereum.svg',
    chainIds: ['0x5'],
    shortcut: 'ETH',
    isTestnet: true,
    nativeCurrency: 'ETH',
  },
  {
    id: 11155111,
    name: 'Sepolia Testnet',
    chainIds: ['0xaa36a7'],
    icon: '/icons/wizard/ethereum.svg',
    shortcut: 'ETH',
    isTestnet: true,
    nativeCurrency: 'ETH',
  },
  {
    id: 809341,
    name: 'BSC',
    icon: '/icons/wizard/binance.svg',
    chainIds: ['0x38'],
    shortcut: 'BSC',
    isTestnet: false,
    nativeCurrency: 'BNB',
  },
  {
    id: 809342,
    name: 'BSC Testnet',
    icon: '/icons/wizard/binance.svg',
    chainIds: ['0x61'],
    shortcut: 'BSC',
    isTestnet: true,
    nativeCurrency: 'BNB',
  },
  {
    id: 589123,
    name: 'Avalanche',
    icon: '/icons/wizard/avax.svg',
    chainIds: ['0xa86a'],
    shortcut: 'AVAX',
    isTestnet: false,
    nativeCurrency: 'AVAX',
  },
  {
    id: 741924,
    name: 'Polygon',
    icon: '/icons/wizard/polygon.svg',
    chainIds: ['0x89'],
    shortcut: 'POLYGON',
    isTestnet: false,
    nativeCurrency: 'MATIC',
  },
  /* {
    id: 294081,
    name: 'PulseChain',
    icon: '/icons/wizard/pulsechain.svg',
    chainIds: [''],
    shortcut: 'PULSE',
    isTestnet: false,nativeCurrency: 'PLS'
  }, */
  {
    id: 847124,
    name: 'Cronos',
    icon: '/icons/wizard/cronos.svg',
    chainIds: ['0x19'],
    shortcut: 'CRONOS',
    isTestnet: false,
    nativeCurrency: 'CRO',
  },
  {
    id: 290842,
    name: 'Heco',
    icon: '/icons/wizard/heco.svg',
    chainIds: ['0x80'],
    shortcut: 'HECO',
    isTestnet: false,
    nativeCurrency: 'HECO',
  },
  {
    id: 398241,
    name: 'Velas',
    icon: '/icons/wizard/velas.svg',
    chainIds: ['0x6a'],
    shortcut: 'VELAS',
    isTestnet: false,
    nativeCurrency: 'VLX',
  },
  {
    id: 941233,
    name: 'Fantom',
    icon: '/icons/wizard/fantom.svg',
    chainIds: ['0xfa'],
    shortcut: 'FANTOM',
    isTestnet: false,
    nativeCurrency: 'FTM',
  },

  {
    id: 567432,
    name: 'Kava',
    icon: '/icons/wizard/kava.svg',
    chainIds: ['0x8ae'],
    shortcut: 'KAVA',
    isTestnet: false,
    nativeCurrency: 'Kava',
  },
  {
    id: 514397,
    name: 'Kava Testnet',
    icon: '/icons/wizard/kava.svg',
    chainIds: ['0x8ad'],
    shortcut: 'KAVA',
    isTestnet: true,
    nativeCurrency: 'KAVA',
  },
  {
    id: 924894,
    name: 'Ethereum Classic',
    icon: '/icons/wizard/etc.svg',
    chainIds: ['0x3d'],
    shortcut: 'ETC',
    isTestnet: false,
    nativeCurrency: 'ETC',
  },
  {
    id: 924895,
    name: 'Ethereum Classic Testnet',
    icon: '/icons/wizard/etc.svg',
    chainIds: ['0x3f'],
    shortcut: 'METC',
    isTestnet: true,
    nativeCurrency: 'METC',
  },
  {
    id: 171,
    name: 'PulseChain',
    icon: '/icons/wizard/pulsechain.svg',
    chainIds: ['0x171'],
    shortcut: 'PLS',
    isTestnet: false,
    nativeCurrency: 'PLS',
  },
  {
    id: 42161,
    name: 'Arbitrum',
    icon: '/icons/wizard/arbitrum.svg',
    chainIds: ['0xa4b1'],
    shortcut: 'ETH',
    isTestnet: false,
    nativeCurrency: 'ETH',
  },
  {
    id: 421613,
    name: 'Arbitrum Testnet',
    icon: '/icons/wizard/arbitrum.svg',
    chainIds: ['0x66eed'],
    shortcut: 'AGOR',
    isTestnet: true,
    nativeCurrency: 'AGOR',
  },
  {
    // basechaindev
    id: 8453,
    name: 'Base',
    icon: '/icons/wizard/basechain.svg',
    chainIds: ['0x2105'],
    shortcut: 'ETH',
    isTestnet: false,
    nativeCurrency: 'ETH',
  },
  {
    id: 324,
    name: 'zkSync',
    icon: '/icons/wizard/zksync.svg',
    chainIds: ['0x144'],
    shortcut: 'ETH',
    isTestnet: false,
    nativeCurrency: 'ETH',
  },
  {
    id: 111111,
    name: 'Tezos',
    icon: '/icons/wizard/tezos.svg',
    chainIds: ['tezos'],
    shortcut: 'XTZ',
    isTestnet: false,
    nativeCurrency: 'XTZ',
    redirectUrl: 'https://tezos.team.finance/mint',
  },
  {
    id: 111112,
    name: 'Casper',
    icon: '/icons/wizard/casper.svg',
    chainIds: ['casper'],
    shortcut: 'CSPR',
    isTestnet: false,
    nativeCurrency: 'CSPR',
    redirectUrl: 'https://casper.team.finance/mint',
  },
]

export const stakingChains: ChainType[] = [
  {
    id: 193248,
    name: 'Ethereum',
    icon: '/icons/wizard/ethereum.svg',
    chainIds: ['0x1'],
    shortcut: 'ETH',
    isTestnet: false,
    nativeCurrency: 'ETH',
  },
  {
    id: 193249,
    name: 'Goerli Testnet',
    icon: '/icons/wizard/ethereum.svg',
    chainIds: ['0x5'],
    shortcut: 'ETH',
    isTestnet: true,
    nativeCurrency: 'ETH',
  },
  {
    id: 11155111,
    name: 'Sepolia Testnet',
    chainIds: ['0xaa36a7'],
    icon: '/icons/wizard/ethereum.svg',
    shortcut: 'ETH',
    isTestnet: true,
    nativeCurrency: 'ETH',
  },
  {
    id: 809341,
    name: 'BSC',
    icon: '/icons/wizard/binance.svg',
    chainIds: ['0x38'],
    shortcut: 'BSC',
    isTestnet: false,
    nativeCurrency: 'BNB',
  },
  {
    id: 809342,
    name: 'BSC Testnet',
    icon: '/icons/wizard/binance.svg',
    chainIds: ['0x61'],
    shortcut: 'BSC',
    isTestnet: true,
    nativeCurrency: 'BNB',
  },
  {
    id: 589123,
    name: 'Avalanche',
    icon: '/icons/wizard/avax.svg',
    chainIds: ['0xa86a'],
    shortcut: 'AVAX',
    isTestnet: false,
    nativeCurrency: 'AVAX',
  },
  {
    id: 741924,
    name: 'Polygon',
    icon: '/icons/wizard/polygon.svg',
    chainIds: ['0x89'],
    shortcut: 'POLYGON',
    isTestnet: false,
    nativeCurrency: 'MATIC',
  },
  /* {
    id: 294081,
    name: 'PulseChain',
    icon: '/icons/wizard/pulsechain.svg',
    chainIds: [''],
    shortcut: 'PULSE',
    isTestnet: false,nativeCurrency: 'PLS'
  }, */
  {
    id: 847124,
    name: 'Cronos',
    icon: '/icons/wizard/cronos.svg',
    chainIds: ['0x19'],
    shortcut: 'CRONOS',
    isTestnet: false,
    nativeCurrency: 'CRO',
  },
  {
    id: 290842,
    name: 'Heco',
    icon: '/icons/wizard/heco.svg',
    chainIds: ['0x80'],
    shortcut: 'HECO',
    isTestnet: false,
    nativeCurrency: 'HECO',
  },
  {
    id: 398241,
    name: 'Velas',
    icon: '/icons/wizard/velas.svg',
    chainIds: ['0x6a'],
    shortcut: 'VELAS',
    isTestnet: false,
    nativeCurrency: 'VLX',
  },
  {
    id: 941233,
    name: 'Fantom',
    icon: '/icons/wizard/fantom.svg',
    chainIds: ['0xfa'],
    shortcut: 'FANTOM',
    isTestnet: false,
    nativeCurrency: 'FTM',
  },

  {
    id: 567432,
    name: 'Kava',
    icon: '/icons/wizard/kava.svg',
    chainIds: ['0x8ae'],
    shortcut: 'KAVA',
    isTestnet: false,
    nativeCurrency: 'Kava',
  },
  {
    id: 514397,
    name: 'Kava Testnet',
    icon: '/icons/wizard/kava.svg',
    chainIds: ['0x8ad'],
    shortcut: 'KAVA',
    isTestnet: true,
    nativeCurrency: 'KAVA',
  },
  {
    id: 924894,
    name: 'Ethereum Classic',
    icon: '/icons/wizard/etc.svg',
    chainIds: ['0x3d'],
    shortcut: 'ETC',
    isTestnet: false,
    nativeCurrency: 'ETC',
  },
  {
    id: 924895,
    name: 'Ethereum Classic Testnet',
    icon: '/icons/wizard/etc.svg',
    chainIds: ['0x3f'],
    shortcut: 'METC',
    isTestnet: true,
    nativeCurrency: 'METC',
  },
  {
    id: 171,
    name: 'PulseChain',
    icon: '/icons/wizard/pulsechain.svg',
    chainIds: ['0x171'],
    shortcut: 'PLS',
    isTestnet: false,
    nativeCurrency: 'PLS',
  },
  {
    id: 42161,
    name: 'Arbitrum',
    icon: '/icons/wizard/arbitrum.svg',
    chainIds: ['0xa4b1'],
    shortcut: 'ETH',
    isTestnet: false,
    nativeCurrency: 'ETH',
  },
  {
    id: 421613,
    name: 'Arbitrum Testnet',
    icon: '/icons/wizard/arbitrum.svg',
    chainIds: ['0x66eed'],
    shortcut: 'AGOR',
    isTestnet: true,
    nativeCurrency: 'AGOR',
  },
  {
    // basechaindev
    id: 8453,
    name: 'Base',
    icon: '/icons/wizard/basechain.svg',
    chainIds: ['0x2105'],
    shortcut: 'ETH',
    isTestnet: false,
    nativeCurrency: 'ETH',
  },
  {
    id: 324,
    name: 'zkSync',
    icon: '/icons/wizard/zksync.svg',
    chainIds: ['0x144'],
    shortcut: 'ETH',
    isTestnet: false,
    nativeCurrency: 'ETH',
  },
]

export const chainServices = {
  tokenLocks: [
    '0x1',
    '0x5',
    '0x38',
    '0xaa36a7',
    '0x61',
    '0xa86a',
    '0x89',
    '0x19',
    '0x80',
    '0x6a',
    '0xfa',
    '0x8ae',
    '0x8ad',
    '0x405',
    '0x3d',
    '0x3f',
    '0x171',
    'algorand',
    'casper',
    'tezos',
    '0xa4b1',
    '0x66eed',
    '0x2105',
    '0x144',
  ],
  nftLocks: [
    '0x1',
    '0x5',
    '0x38',
    '0xaa36a7',
    '0x61',
    '0xa86a',
    '0x89',
    '0x19',
    '0x80',
    '0x6a',
    '0xfa',
    '0x8ae',
    '0x8ad',
    '0x405',
    '0x3d',
    '0x3f',
    '0x171',
    'tezos',
    '0xa4b1',
    '0x66eed',
    '0x2105',
    '0x144',
  ],
  vesting: [
    '0x1',
    '0x5',
    '0x38',
    '0xaa36a7',
    '0x61',
    '0xa86a',
    '0x89',
    '0x19',
    '0x80',
    '0x6a',
    '0xfa',
    '0x8ae',
    '0x8ad',
    '0x405',
    '0x3d',
    '0x3f',
    '0x171',
    'casper',
    'tezos',
    '0xa4b1',
    '0x66eed',
    '0x2105',
    '0x144',
  ],
  mint: [
    '0x1',
    '0x5',
    '0x38',
    '0xaa36a7',
    '0x61',
    '0xa86a',
    '0x89',
    '0x19',
    '0x80',
    '0x6a',
    '0xfa',
    '0x8ae',
    '0x8ad',
    '0x405',
    '0x3d',
    '0x3f',
    '0x171',
    'tezos',
    '0xa4b1',
    '0x66eed',
    '0x2105',
    '0x144',
  ],
  liqLocks: [
    '0x1',
    '0x5',
    '0x38',
    '0xaa36a7',
    '0x61',
    '0xa86a',
    '0x89',
    '0x19',
    '0x80',
    '0x6a',
    '0xfa',
    '0x8ae',
    '0x8ad',
    '0x405',
    '0x3d',
    '0x3f',
    '0x171',
    'tezos',
    '0xa4b1',
    '0x66eed',
    '0x2105',
    '0x144',
  ],
  staking: [
    '0x1',
    '0x5',
    '0x38',
    '0xaa36a7',
    '0x61',
    '0xa86a',
    '0x89',
    '0x19',
    '0x80',
    '0x6a',
    '0xfa',
    '0x8ae',
    '0x8ad',
    '0x405',
    '0x3d',
    '0x3f',
    '0x171',
    'tezos',
    'casper',
    '0xa4b1',
    '0x66eed',
    '0x2105',
    '0x144',
  ],
}

export default chains