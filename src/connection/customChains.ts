import { Chain } from 'wagmi'

export const cronos: Chain = {
  id: 25,
  name: 'Cronos',
  network: 'cronos',
  nativeCurrency: {
    name: 'Cronos',
    symbol: 'CRO',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://evm.cronos.org'],
    },
    public: {
      http: ['https://evm.cronos.org'],
    },
  },
  blockExplorers: {
    default: {
      name: '',
      url: 'https://cronoscan.com',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    },
  },
}

export const heco: Chain = {
  id: 128,
  name: 'Heco',
  network: 'heco',
  nativeCurrency: {
    name: 'Heco-Mainnet',
    symbol: 'HT',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://http-mainnet.hecochain.com'],
    },
    public: {
      http: ['https://http-mainnet.hecochain.com'],
    },
  },
  blockExplorers: {
    default: {
      name: '',
      url: 'https://hecoinfo.com',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    },
  },
}

export const velas: Chain = {
  id: 106,
  name: 'Velas',
  network: 'velas',
  nativeCurrency: {
    name: 'Velas-Mainnet',
    symbol: 'VLX',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://evmexplorer.velas.com/rpc'],
    },
    public: {
      http: ['https://evmexplorer.velas.com/rpc'],
    },
  },
  blockExplorers: {
    default: {
      name: '',
      url: 'https://evmexplorer.velas.com/rpc',
    },
  },
  contracts: {
    multicall3: {
      address: '0xaF4C2205c1DFDE65c49A08e3395ef08F0538D614',
    },
  },
}

export const kava: Chain = {
  id: 2222,
  name: 'Kava',
  network: 'kava',
  nativeCurrency: {
    name: 'Kava',
    symbol: 'KAVA',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://evm.kava.io'],
    },
    public: {
      http: ['https://evm.kava.io'],
    },
  },
  blockExplorers: {
    default: {
      name: '',
      url: 'https://explorer.kava.io',
    },
  },
  contracts: {
    multicall3: {
      address: '0xfd13c2CF207A1a41aDa47E07408458547d4721E1',
    },
  },
}

export const etc: Chain = {
  id: 61,
  name: 'Ethereum Classic',
  network: 'ethereum classic',
  nativeCurrency: {
    name: 'ETC',
    symbol: 'ETC',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://www.ethercluster.com/etc'],
    },
    public: {
      http: ['https://www.ethercluster.com/etc'],
    },
  },
  blockExplorers: {
    default: {
      name: '',
      url: 'https://blockscout.com/etc/mainnet/',
    },
  },
  contracts: {
    multicall3: {
      address: '0x804630812f3939462205194C83FD2E51B2625d40',
    },
  },
}

export const kavaTestnet: Chain = {
  id: 2221,
  name: 'Kava Testnet',
  network: 'kava testnet',
  nativeCurrency: {
    name: 'Kava Test Network',
    symbol: 'KAVA',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://evm.testnet.kava.io'],
    },
    public: {
      http: ['https://evm.testnet.kava.io'],
    },
  },
  blockExplorers: {
    default: {
      name: '',
      url: 'https://explorer.testnet.kava.io',
    },
  },
  contracts: {
    multicall3: {
      address: '0x61Afc8fa65D2E5aEbd2eE2Ca87942Ea98ABde0eF',
      blockCreated: 4_565_593,
    },
  },
}

export const etcTestnet: Chain = {
  id: 63,
  name: 'Ethereum Classic Testnet',
  network: 'ethereum classic testnet',
  nativeCurrency: {
    name: 'METC',
    symbol: 'METC',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://www.ethercluster.com/mordor'],
    },
    public: {
      http: ['https://www.ethercluster.com/mordor'],
    },
  },
  blockExplorers: {
    default: {
      name: '',
      url: 'https://blockscout.com/etc/mordor/',
    },
  },
}

export const pulseChain: Chain = {
  id: 369,
  name: 'PulseChain',
  network: 'PulseChain',
  nativeCurrency: {
    name: 'PLS',
    symbol: 'PLS',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.pulsechain.com'],
    },
    public: {
      http: ['https://rpc.pulsechain.com'],
    },
  },
  blockExplorers: {
    default: {
      name: '',
      url: 'https://scan.pulsechain.com/',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 4_565_593,
    },
  },
}

export const baseMainnet: Chain = {
  id: 8453,
  name: 'Base Chain',
  network: 'Base',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://developer-access-mainnet.base.org'],
    },
    public: {
      http: ['https://developer-access-mainnet.base.org	'],
    },
  },
  blockExplorers: {
    default: {
      name: '',
      url: 'https://basescan.org/',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 1_371_688,
    },
  },
}

export const zkSyncMainnet: Chain = {
  id: 324,
  name: 'zkSync Chain',
  network: 'zkSync',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://mainnet.era.zksync.io'],
    },
    public: {
      http: ['https://mainnet.era.zksync.io'],
    },
  },
  blockExplorers: {
    default: {
      name: '',
      url: 'https://explorer.zksync.io/',
    },
  },
  contracts: {
    multicall3: {
      address: '0x47898B2C52C957663aE9AB46922dCec150a2272c',
      blockCreated: 1_371_688,
    },
  },
}
