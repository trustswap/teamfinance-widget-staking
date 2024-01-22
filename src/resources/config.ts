import { BigNumber } from 'ethers'

const config: {
  [key: string]: {
    [key: string]: `0x${string}`
  }
} = {
  mainnet: {
    lockerFactory: '0xca433f463321aeb9a42d1a0e684f8f680c94782c',
    rewardsService: '0xd6A07b8065f9e8386A9a5bBA6A754a10A9CD1074',
    vestingFactory: '0x65d22f2B883f4527ba64D6F5123cb4f04CCcAE98',
    vestingFactoryV3: '0x64D06dcc12fA07e302f052a9F5BC1aa11e29D9E2',
    lockToken: '0xe2fe530c047f2d85298b07d9333c05737f1435fb',
    rewardLockToken: '0x0000000000000000000000000000000000000000',
  },
  goerli: {
    lockerFactory: '0x0000000000000000000000000000000000000000', // old ropsten: 0x782ff63462229beeb7c59fad0bef04ee5cdc139e
    rewardsService: '0xd6A07b8065f9e8386A9a5bBA6A754a10A9CD1074',
    vestingFactory: '0xe37EF03EA7F2a6Be781F5bC36b98C8c630692C73',
    vestingFactoryV3: '0x64D06dcc12fA07e302f052a9F5BC1aa11e29D9E2',
    lockToken: '0x256c6f9823c9107900a0f35d041247882cb88efd',
    // temporary till official deployment
    rewardLockToken: '0x92a768Ca4692C5BE6703F632EaD4Cda01e6bCd04',
  },
  sepolia: {
    lockerFactory: '0x0000000000000000000000000000000000000000',
    rewardsService: '0xd6A07b8065f9e8386A9a5bBA6A754a10A9CD1074',
    vestingFactory: '0x0000000000000000000000000000000000000000',
    vestingFactoryV3: '0x64D06dcc12fA07e302f052a9F5BC1aa11e29D9E2',
    lockToken: '0x4f0fd563be89ec8c3e7d595bf3639128c0a7c33a',
    rewardLockToken: '0x0000000000000000000000000000000000000000',
  },
  bscMainnet: {
    lockerFactory: '0x116CF7d2Eb9725f6442c9615AeFc1aE9273D7d69',
    rewardsService: '0xd6A07b8065f9e8386A9a5bBA6A754a10A9CD1074',
    vestingFactory: '0x65d22f2B883f4527ba64D6F5123cb4f04CCcAE98',
    vestingFactoryV3: '0x64D06dcc12fA07e302f052a9F5BC1aa11e29D9E2',
    lockToken: '0x0c89c0407775dd89b12918b9c0aa42bf96518820',
    rewardLockToken: '0x0000000000000000000000000000000000000000',
  },
  avaxMainnet: {
    lockerFactory: '0x2B45Ba2F83E6E5f0286e648588FE8076522174eC',
    rewardsService: '0xd6A07b8065f9e8386A9a5bBA6A754a10A9CD1074',
    vestingFactory: '0x65d22f2B883f4527ba64D6F5123cb4f04CCcAE98',
    vestingFactoryV3: '0x64D06dcc12fA07e302f052a9F5BC1aa11e29D9E2',
    lockToken: '0xe2fe530c047f2d85298b07d9333c05737f1435fb',
    rewardLockToken: '0x0000000000000000000000000000000000000000',
  },
  avaxTestnet: {
    lockerFactory: '0x6f19dE6D19A67bA82c9f805De77753fAF78d12c7',
    rewardsService: '0xd6A07b8065f9e8386A9a5bBA6A754a10A9CD1074',
    vestingFactory: '0x0000000000000000000000000000000000000000',
    vestingFactoryV3: '0xDAF5d693eA7991396Da56EC1A3367fc8Df94cF45',
    lockToken: '0xc79b22cf9bde5b6441ae1ad713aec0aa8cf9e19d',
    rewardLockToken: '0x0000000000000000000000000000000000000000',
  },
  bscTestnet: {
    lockerFactory: '0x6f19de6d19a67ba82c9f805de77753faf78d12c7',
    rewardsService: '0xd6A07b8065f9e8386A9a5bBA6A754a10A9CD1074',
    vestingFactory: '0x962f07445ED033f7A8815ec349D9Eceb77F5C3c2',
    vestingFactoryV3: '0x64D06dcc12fA07e302f052a9F5BC1aa11e29D9E2',
    lockToken: '0x8e89f184a549dc8f56728e4787b6157af77ec35e',
    rewardLockToken: '0x0000000000000000000000000000000000000000',
  },
  polygonMainnet: {
    lockerFactory: '0xcC9aC11da7A62395B49bEaD5A96B87525bC6a430',
    rewardsService: '0xd6A07b8065f9e8386A9a5bBA6A754a10A9CD1074',
    vestingFactory: '0x65d22f2B883f4527ba64D6F5123cb4f04CCcAE98',
    vestingFactoryV3: '0x64D06dcc12fA07e302f052a9F5BC1aa11e29D9E2',
    lockToken: '0x3ef7442df454ba6b7c1deec8ddf29cfb2d6e56c7',
    rewardLockToken: '0x0000000000000000000000000000000000000000',
  },
  polygonTestnet: {
    lockerFactory: '0xE843f3BB9D63F9bB340aBE68da3CC03307e7Eb05',
    rewardsService: '0xd6A07b8065f9e8386A9a5bBA6A754a10A9CD1074',
    vestingFactory: '0x0000000000000000000000000000000000000000',
    vestingFactoryV3: '0xDAF5d693eA7991396Da56EC1A3367fc8Df94cF45',
    lockToken: '0x0891b3728ba802e5240ae3552749eb23093ed2d5',
    rewardLockToken: '0x0000000000000000000000000000000000000000',
  },
  kavaMainnet: {
    lockerFactory: '0xa9ec655dac35d989c0c8be075b1106dcd32502d6',
    rewardsService: '0xd6A07b8065f9e8386A9a5bBA6A754a10A9CD1074',
    vestingFactory: '0x65d22f2B883f4527ba64D6F5123cb4f04CCcAE98',
    vestingFactoryV3: '0xd5D3d09997e005A05477A52b2EAF98D9276655a7',
    lockToken: '0xa9ec655dac35d989c0c8be075b1106dcd32502d6',
    rewardLockToken: '0x0000000000000000000000000000000000000000',
  },
  kavaTestnet: {
    lockerFactory: '0xd883fbb2db56a837d671f9a50ab10ab683ce1770',
    rewardsService: '0x8e89F184a549Dc8f56728e4787b6157Af77Ec35E',
    vestingFactory: '0x65d22f2B883f4527ba64D6F5123cb4f04CCcAE98',
    vestingFactoryV3: '0x64D06dcc12fA07e302f052a9F5BC1aa11e29D9E2',
    lockToken: '0xd883fbb2db56a837d671f9a50ab10ab683ce1770',
    rewardLockToken: '0x0000000000000000000000000000000000000000',
  },
  velasMainnet: {
    lockerFactory: '0x2434e043e4d63271ca16c302166b4c0aDe0Af4dE',
    rewardsService: '0x0E7a5D265FC08E9Eb9468c51B126fE24B9C8e645',
    vestingFactory: '0x65d22f2B883f4527ba64D6F5123cb4f04CCcAE98',
    vestingFactoryV3: '0x64D06dcc12fA07e302f052a9F5BC1aa11e29D9E2',
    lockToken: '0xE2fE530C047f2d85298b07D9333C05737f1435fB',
    rewardLockToken: '0x0000000000000000000000000000000000000000',
  },
  hecoMainnet: {
    lockerFactory: '0xBE1A10e2815A5E9DaB515531A05684E7Ea0B5aEB',
    rewardsService: '0x0E7a5D265FC08E9Eb9468c51B126fE24B9C8e645',
    vestingFactory: '0x65d22f2B883f4527ba64D6F5123cb4f04CCcAE98',
    vestingFactoryV3: '0x64D06dcc12fA07e302f052a9F5BC1aa11e29D9E2',
    lockToken: '0xE2fE530C047f2d85298b07D9333C05737f1435fB',
    rewardLockToken: '0x0000000000000000000000000000000000000000',
  },
  fantomMainnet: {
    lockerFactory: '0x586c21A779C24eFd2a8aF33C9F7Df2a2EA9aF55c',
    rewardsService: '0x0E7a5D265FC08E9Eb9468c51B126fE24B9C8e645',
    vestingFactory: '0x65d22f2B883f4527ba64D6F5123cb4f04CCcAE98',
    vestingFactoryV3: '0x64D06dcc12fA07e302f052a9F5BC1aa11e29D9E2',
    lockToken: '0xCCEBbE9e2b8f46C2C6862238e60a396AF790B63e',
    rewardLockToken: '0x0000000000000000000000000000000000000000',
  },
  cronosMainnet: {
    lockerFactory: '0x0000000000000000000000000000000000000000',
    rewardsService: '0x0E7a5D265FC08E9Eb9468c51B126fE24B9C8e645',
    vestingFactory: '0x65d22f2B883f4527ba64D6F5123cb4f04CCcAE98',
    vestingFactoryV3: '0x64D06dcc12fA07e302f052a9F5BC1aa11e29D9E2',
    lockToken: '0x4f0fd563be89ec8c3e7d595bf3639128c0a7c33a',
    rewardLockToken: '0x0000000000000000000000000000000000000000',
  },
  etcMainnet: {
    lockerFactory: '0x0000000000000000000000000000000000000000',
    rewardsService: '0x0E7a5D265FC08E9Eb9468c51B126fE24B9C8e645',
    vestingFactory: '0x0000000000000000000000000000000000000000',
    vestingFactoryV3: '0x64D06dcc12fA07e302f052a9F5BC1aa11e29D9E2',
    lockToken: '0x586c21A779C24eFd2a8aF33C9F7Df2a2EA9aF55c',
    rewardLockToken: '0x0000000000000000000000000000000000000000',
  },
  etcTestnet: {
    lockerFactory: '0x0000000000000000000000000000000000000000',
    rewardsService: '0x0000000000000000000000000000000000000000',
    vestingFactory: '0x0000000000000000000000000000000000000000',
    vestingFactoryV3: '0x0000000000000000000000000000000000000000',
    lockToken: '0x2EA28A07b82701B76de450C67Aa7A4259bC4C75e',
    rewardLockToken: '0x0000000000000000000000000000000000000000',
  },
  pulseChain: {
    lockerFactory: '0xca433f463321aeb9a42d1a0e684f8f680c94782c',
    rewardsService: '0xd6A07b8065f9e8386A9a5bBA6A754a10A9CD1074',
    vestingFactory: '0x65d22f2B883f4527ba64D6F5123cb4f04CCcAE98',
    vestingFactoryV3: '0x64D06dcc12fA07e302f052a9F5BC1aa11e29D9E2',
    lockToken: '0xe2fe530c047f2d85298b07d9333c05737f1435fb',
  },
  arbMainnet: {
    lockToken: '0xe0b0d2021293bee9715e1db3be31b55c00f72a75',
    lockerFactory: '0x0000000000000000000000000000000000000000',
    rewardsService: '0x53a8e3966794E1cDB16593B0a5F987a09f019e95',
    vestingFactory: '0x0000000000000000000000000000000000000000',
    vestingFactoryV3: '0x64D06dcc12fA07e302f052a9F5BC1aa11e29D9E2',
    rewardLockToken: '0x0000000000000000000000000000000000000000',
  },
  arbTestnet: {
    // arbitrum (goerli)
    lockToken: '0x6fd300cd12f30e1cbe4fd7baf9df7874a18531bb',
    lockerFactory: '0x0000000000000000000000000000000000000000',
    rewardsService: '0x4bC0ca85E10A9b4D1F4F60B978EDaA06F76E8aCB',
    vestingFactory: '0xC24433234AbC37A95F5034607b6eE2ddb886bdd7',
    vestingFactoryV3: '0x64D06dcc12fA07e302f052a9F5BC1aa11e29D9E2',
    rewardLockToken: '0x0000000000000000000000000000000000000000',
  },
  baseMainnet: {
    // basechaindev
    lockToken: '0x4f0fd563be89ec8c3e7d595bf3639128c0a7c33a',
    lockerFactory: '0x0000000000000000000000000000000000000000',
    rewardsService: '0x9e9ce71871ac9C4Fa96Df5B9A474E7a52E4040e6',
    vestingFactory: '0x0000000000000000000000000000000000000000',
    vestingFactoryV3: '0x64D06dcc12fA07e302f052a9F5BC1aa11e29D9E2',
    rewardLockToken: '0x0000000000000000000000000000000000000000',
  },
  zkSyncMainnet: {
    lockToken: '0xE6fcefa80C6eEc28b2682EbB6b4b476E7F2b9Bdf',
    lockerFactory: '0x0000000000000000000000000000000000000000',
    rewardsService: '0x9504911c2a78e2f78673FEBEf978207Fc5aB3a55',
    vestingFactory: '0x0000000000000000000000000000000000000000',
    vestingFactoryV3: '0xb5ded5774BB01B22a06e58A06917eF1f10b2F61A',
    rewardLockToken: '0x0000000000000000000000000000000000000000',
  },
}

export const getArtifact = (chainId: string) => {
  switch (chainId) {
    case '0x1':
      return config.mainnet
    case '0x5':
      return config.goerli
    case '0xaa36a7':
      return config.sepolia
    case '0x38':
      return config.bscMainnet
    case '0x61':
      return config.bscTestnet
    case '0xa86a':
      return config.avaxMainnet
    case '0x89':
      return config.polygonMainnet
    case '0x8ae':
      return config.kavaMainnet
    case '0x8ad':
      return config.kavaTestnet
    case '0x6a':
      return config.velasMainnet
    case '0x80':
      return config.hecoMainnet
    case '0xfa':
      return config.fantomMainnet
    case '0x19':
      return config.cronosMainnet
    case '0x3d':
      return config.etcMainnet
    case '0x3f':
      return config.etcTestnet
    case '0x171':
      return config.pulseChain
    case '0xa4b1':
      return config.arbMainnet
    case '0x66eed':
      return config.arbTestnet
    case '0x2105': // basechaindev
      return config.baseMainnet // basechaindev
    case '0x144':
      return config.zkSyncMainnet
    default:
      return config.mainnet
  }
}

export const getDefaultGasLimit = (functionName: string): BigNumber => {
  switch (functionName) {
    case 'approve':
      return BigNumber.from('73000')
    case 'lockToken':
      return BigNumber.from('720000')
    case 'lockNFT':
      return BigNumber.from('608000')
    case 'extendLockDuration':
      return BigNumber.from('68000')
    case 'transferLocks':
      return BigNumber.from('161000')
    case 'safeTransferFrom':
      return BigNumber.from('234000')
    case 'mintNFTforLock':
      return BigNumber.from('168000')
    case 'withdrawTokens':
      return BigNumber.from('231000')
    case 'splitLock':
      return BigNumber.from('410104')
    case 'claimRewards':
      return BigNumber.from('720000')
    case 'claimToken':
      return BigNumber.from('300000')
    case 'claim':
      return BigNumber.from('70000')
    case 'createVesting':
      return BigNumber.from('1080000')
    default:
      throw new Error(`Could not find default gas limit for ${functionName}`)
  }
}
