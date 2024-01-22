export const TokenTypeEnum = {
  LIQUIDITY_TOKEN: 0,
  NFT_TOKEN: 1,
  PROJECT_TOKEN: 2,
  NFT_LOCK: 3,
  REWARD_TOKEN: 4,
  REWARD_NFT: 5,
}

export const OrderTypeEnum = {
  MOST_RECENT: 0,
  NAME: 1,
  BLOCKCHAIN: 2,
  LIQUIDITY_LOCKED: 3,
  COINGECKO_RANKING: 4,
  TOKENS_LOCKED: 5,
  VALUE_LOCKED: 6,
  NEXT_UNLOCK: 7,
}

export const tokenTypes = [
  {
    id: TokenTypeEnum.LIQUIDITY_TOKEN,
    title: 'Liquidity Tokens',
    icon: '/icons/wizard/ethereum.svg',
    subtitleFindToken:
      'Enter the pair address you would like to lock liquidity for',
    disabled: false,
    validChains: [
      '0x1',
      '0x5',
      '0xaa36a7',
      /* polygon */ '0x89',
      /* binance */ '0x38',
      '0x61',
      /* velas */ '0x6a',
      /* heco */ '0x80',
      /* fantom */ '0xfa',
      /* etc */ '0x3d',
      /* avalanche */ '0xa86a',
      /* kava */ '0x8ae',
      /* cronos */ '0x19',
      /* pulsechain */ '0x171',
      /* arbitrum testnet */ '0x66eed',
      /* arbitrum */ '0xa4b1',
      /* base */ '0x2105', // basechaindev
      /* zkSync */ '0x144',
    ],
  },
  {
    id: TokenTypeEnum.NFT_TOKEN,
    title: 'Liquidity NFTs',
    icon: '/icons/wizard/ethereum.svg',
    subtitleFindToken: 'Enter the token id you would like to lock for',
    disabled: false,
    validChains: ['0x1', '0x5', /* polygon */ '0x89'],
  },
  {
    id: TokenTypeEnum.PROJECT_TOKEN,
    title: 'Project Tokens',
    icon: '/icons/wizard/ethereum.svg',
    subtitleFindToken: 'Enter the token address you would like to lock for',
    disabled: false,
    validChains: [
      '0x1',
      '0x5',
      '0xaa36a7',
      /* polygon */ '0x89',
      /* avalanche */ '0xa86a',
      /* binance */ '0x38',
      '0x61',
      /* kava */ '0x8ae',
      /* kava testnet */ '0x8ad',
      /* velas */ '0x6a',
      /* heco */ '0x80',
      /* fantom */ '0xfa',
      /* cronos */ '0x19',
      /* etc */ '0x3d',
      /* etc */ '0x3f',
      /* pulsechain */ '0x171',
      /* base */ '0x2105', // basechaindev
      /* zkSync */ '0x144',
    ],
  },
  {
    id: TokenTypeEnum.NFT_LOCK,
    title: 'Regular NFTs',
    icon: '/icons/wizard/ethereum.svg',
    subtitleFindToken: 'Enter the NFT url you would like to lock for',
    disabled: false,
    validChains: [
      '0x1',
      '0x5',
      '0xaa36a7',
      /* polygon */ '0x89',
      /* avalanche */ '0xa86a',
      /* binance */ '0x38',
      '0x61',
      /* pulsechain */ '0x171',
      /* base */ '0x2105', // basechaindev
      /* zkSync */ '0x144',
    ],
  },
  // REWARD LOCKS COMMENTED
  // DO NOT REMOVE
  // {
  //   id: TokenTypeEnum.REWARD_TOKEN,
  //   title: 'Reward/Reflection Tokens',
  //   icon: '/icons/wizard/ethereum.svg',
  //   subtitleFindToken:
  //     'Enter the reward/reflection token address you would like to lock for',
  //   disabled: false,
  //   validChains: [
  //     '0x1',
  //     '0x5',
  //     /* polygon */ '0x89',
  //     /* avalanche */ '0xa86a',
  //     /* binance */ '0x38',
  //   ],
  // },
  // {
  //   id: TokenTypeEnum.REWARD_NFT,
  //   title: 'Reward/Reflection NFTs',
  //   icon: '/icons/wizard/ethereum.svg',
  //   subtitleFindToken:
  //     'Enter the reward/reflection NFT token address you would like to lock for',
  //   disabled: false,
  //   validChains: [
  //     '0x1',
  //     '0x5',
  //     /* polygon */ '0x89',
  //     /* avalanche */ '0xa86a',
  //     /* binance */ '0x38',
  //   ],
  // },
]

export const getSubtitleByChainId = (id: number, chainId: string) => {
  if (id === TokenTypeEnum.LIQUIDITY_TOKEN) {
    // if (['0x38', '0x61'].includes(chainId)) {
    //   return 'CAKE-LP Tokens generated from Pancakeswap Pool'
    // }
    // if (['0x89'].includes(chainId)) {
    //   return 'QUICK-LP Tokens generated from Quickswap Pool'
    // }
    // if (['0xa86a'].includes(chainId)) {
    //   return 'Regular AVAX Project Tokens'
    // }
    // if (['0x8ae', '0x8ad'].includes(chainId)) {
    //   return 'Regular Kava Project Tokens'
    // }
    // if (['0x6a'].includes(chainId)) {
    //   return 'Wagyu Tokens generated from WagyuSwap Pool'
    // }
    // if (['0x80'].includes(chainId)) {
    //   return 'HSWAP LP Tokens generated from Hswap Pool'
    // }
    // if (['0xfa'].includes(chainId)) {
    //   return 'SPIRIT-LP LP Tokens generated from SpiritSwap Pool'
    // }
    return "LP Tokens generated from popular DEX's"
  }
  if (id === TokenTypeEnum.NFT_TOKEN) {
    return 'UNI-V3 LP Non-fungible Tokens generated from Uniswap V3 Pools'
  }
  if (id === TokenTypeEnum.PROJECT_TOKEN) {
    if (['0x38', '0x61'].includes(chainId)) {
      return 'Regular BEP-20 Project Tokens'
    }
    if (['0xa86a'].includes(chainId)) {
      return 'Regular AVAX Project Tokens'
    }
    if (['0x8ae', '0x8ad'].includes(chainId)) {
      return 'Regular Kava Project Tokens'
    }
    if (['0x6a'].includes(chainId)) {
      return 'Regular Velas Project Tokens'
    }
    if (['0x80'].includes(chainId)) {
      return 'Regular Heco Project Tokens'
    }
    if (['0xfa'].includes(chainId)) {
      return 'Regular Fantom Project Tokens'
    }
    if (['0x19'].includes(chainId)) {
      return 'Regular Cronos Project Tokens'
    }
    if (['0x171'].includes(chainId)) {
      return 'Regular PulseChain Project Tokens'
    }
    return 'Regular ERC20 Project Tokens'
  }
  if (id === TokenTypeEnum.REWARD_TOKEN) {
    return 'Reflection/Reward Project Tokens'
  }
  if (id === TokenTypeEnum.REWARD_NFT) {
    return 'Reflection/Reward - Non-Fungible Tokens'
  }
  return 'Regular - Non-Fungible Tokens'
}

export const getPlaceholderByChainId = (id: number) => {
  if (id === TokenTypeEnum.LIQUIDITY_TOKEN) {
    return 'Pair Address'
  }
  if (id === TokenTypeEnum.NFT_TOKEN) {
    return 'Uniswap-V3 Liquidity Token ID'
  }
  if (id === TokenTypeEnum.PROJECT_TOKEN || id === TokenTypeEnum.REWARD_TOKEN) {
    return 'Token address'
  }
  return 'NFT URL'
}

export const getIconByChainId = (chainId: string) => {
  if (['0x1', '0x3', '0x4', '0x5'].includes(chainId)) {
    return '/icons/wizard/ethereum.svg'
  }
  if (['0x38', '0x61'].includes(chainId)) {
    return '/icons/wizard/binance.svg'
  }
  if (['0xa86a', '0xa869'].includes(chainId)) {
    return '/icons/wizard/avax.svg'
  }
  if (['0x89', '0x13881'].includes(chainId)) {
    return '/icons/wizard/polygon.svg'
  }
  if (['0x3ac', '0x171'].includes(chainId)) {
    return '/icons/wizard/pulsechain.svg'
  }
  if (['0x152', '0x19'].includes(chainId)) {
    return '/icons/wizard/cronos.svg'
  }
  if (['0x100', '0x80'].includes(chainId)) {
    return '/icons/wizard/heco.svg'
  }
  if (['0x6a', '0x6f'].includes(chainId)) {
    return '/icons/wizard/velas.svg'
  }
  if (['0xfa', '0xfa2'].includes(chainId)) {
    return '/icons/wizard/fantom.svg'
  }
  if (['0x8ae', '0x8ad'].includes(chainId)) {
    return '/icons/wizard/kava.svg'
  }
  if (['0x3d', '0x3f'].includes(chainId)) {
    return '/icons/wizard/etc.svg'
  }
  if (['0x2101'].includes(chainId)) {
    return '/icons/wizard/basechain.svg' // basechaindev
  }
  if (['0x144'].includes(chainId)) {
    return '/icons/wizard/zksync.svg'
  }
  return '/icons/wizard/ethereum.svg'
}
