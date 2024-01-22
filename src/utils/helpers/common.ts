// eslint-disable-next-line import/no-unresolved
import { times, toNumber } from 'lodash'
import moment from 'moment'
import numbro from 'numbro'

// import { http } from '../services'

export const defaultFormatDate = 'MM/DD/YYYY'

export const formatBigNumber = (num: number, digits: number) => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  const result = lookup
    .slice()
    .reverse()
    .find((item) => num >= item.value)
  return result
    ? (num / result.value).toFixed(digits).replace(rx, '$1') + result.symbol
    : '0'
}

const fixedFloat = (input: string, decimals: number) => {
  const arr = `${input}`.split('.')
  if (arr.length === 1)
    return decimals === 0
      ? input
      : [input, '.', times(decimals, () => '0').join('')].join('')
  const int = arr[0]
  const max = arr[1].length
  const dec = arr[1].substring(0, decimals > max ? max : decimals)
  return decimals === 0
    ? int
    : [
        int,
        '.',
        dec.length >= decimals
          ? dec
          : dec + times(decimals - dec.length, () => '0').join(''),
      ].join('')
}

export const formatNumber = (number: number, mantissa = 2) => {
  if (number === 0) {
    return numbro(Number(number)).format({ mantissa })
  }

  if (Number(number) > 100) {
    return numbro(Number(number)).format({ thousandSeparated: true, mantissa })
  }

  if (Number(number) < 1) {
    return number
  }

  return numbro(Number(number)).format({ mantissa, optionalMantissa: true })
}

export const formatNumberToFirstDecimalOccurence = (
  value: number,
  mantissa = 0
) => {
  if (value === 0) {
    return value
  }

  if (value < 1) {
    const man = mantissa > 0 ? mantissa - 1 : 0
    const p = Math.abs(Math.floor(Math.log10(value))) + man
    return Math.round(value * 10 ** p) / 10 ** p
  }

  return Math.round(value * 10 ** mantissa) / 10 ** mantissa
}

export const formatCurrency = (currency: number, fixed = 2) => {
  if (!currency) return '0.00'
  const currencyAsNumber = toNumber(currency)
  if (typeof currencyAsNumber === 'number') {
    return fixedFloat(String(currency), fixed).replace(
      /(\d)(?=(\d\d\d)+(?!\d))/g,
      '$1,'
    )
  }
  return (
    String(currency)
      // eslint-disable-next-line
      .replace(/[(a-zA-Z)\s\_\,\-]+/g, '')
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
  )
}

export const formatCurrencyToFirstDecimalOccurence = (
  value: number,
  mantissa = 0
) => {
  if (value === 0) {
    return value
  }

  if (value < 1) {
    const p = Math.abs(Math.floor(Math.log10(value))) + mantissa
    return Math.round(value * 10 ** p) / 10 ** p
  }

  return formatCurrency(value)
}

export const formatAbout = ({ amount }: { amount: number }) => {
  if (!amount) return '--'
  return numbro(amount)
    .format({
      thousandSeparated: true,
      average: true,
      totalLength: 3,
    })
    .toUpperCase()
}

export const formatNullableCurrency = ({
  currency,
  requesting,
  fixed = 2,
}: {
  currency: number
  requesting: boolean
  fixed?: number
}) =>
  !requesting && currency > 0
    ? `$${'\u00A0'}${formatCurrency(currency, fixed)}`
    : `$${'\u00A0'} --`

export const getNumberOrPlaceholder = ({
  number,
  requesting,
}: {
  number: number
  requesting: boolean
}) => (!requesting && number > 0 ? `${number}` : '--')

export const getTimeLeft = (start: number, end: number) => {
  const dateLocked = moment.unix(start)
  const unlockDate = moment.unix(end)
  const duration = moment.duration(unlockDate.diff(moment()))
  const years = duration.get('y')
  const months = duration.get('M')
  const days = duration.get('d')
  const hours = duration.get('h')
  const minutes = duration.get('m')
  const seconds = duration.get('s')

  const yearsString = `${years} ${years > 1 ? 'Years' : 'Year'}`
  const monthsString = `${months} ${months > 1 ? 'Months' : 'Month'}`
  const daysString = `${days} ${days > 1 ? 'Days' : 'Day'}`
  const hoursString = `${hours} ${hours > 1 ? 'Hours' : 'Hour'}`
  const minutuesString = `${minutes} ${minutes > 1 ? 'Minutes' : 'Minute'}`
  const secondsString = `${seconds} ${seconds > 1 ? 'Seconds' : 'Second'}`

  const response = {
    timeLeft: 0,
    timeLeftString: 'No Locks',
    format: 60,
    type: 'n',
    percent: 0,
    percentLeft: 0,
  }

  if (end !== 0 && end !== undefined && end !== null) {
    if (years) {
      response.timeLeft = years
      response.timeLeftString = yearsString
      response.format = 10
      response.type = 'y'
    } else if (months) {
      response.timeLeft = months
      response.timeLeftString = monthsString
      response.format = 12
      response.type = 'M'
    } else if (days) {
      response.timeLeft = days
      response.timeLeftString = daysString
      response.format = 30
      response.type = 'd'
    } else if (hours) {
      response.timeLeft = hours
      response.timeLeftString = hoursString
      response.format = 24
      response.type = 'h'
    } else if (minutes) {
      response.timeLeft = minutes
      response.timeLeftString = minutuesString
      response.format = 60
      response.type = 'm'
    } else if (seconds) {
      response.timeLeft = seconds
      response.timeLeftString = secondsString
      response.format = 60
      response.type = 'm'
    }
  }
  response.percentLeft =
    (unlockDate.diff(moment()) / unlockDate.diff(dateLocked)) * 100
  return response
}

export const toHex = (num: any) => {
  const val = Number(num)
  return `0x${val.toString(16)}`
}

export const isBSC = (chainId: string) => ['0x38', '0x61'].includes(chainId)
export const isETR = (chainId: string) =>
  ['0x1', '0x3', '0x4', '0x5', '0xaa36a7'].includes(chainId)
// Added dummy value for UI Creation
export const isALGO = (chainId: string) =>
  ['0xmain', '0xtest'].includes(chainId)
export const isAVAX = (chainId: string) =>
  ['0xa86a', '0xa869'].includes(chainId)
export const isMATIC = (chainId: string) =>
  ['0x89', '0x13881'].includes(chainId)
export const isPULSE = (chainId: string) => ['0x3ac', '0x171'].includes(chainId)
export const isCronos = (chainId: string) => ['0x152', '0x19'].includes(chainId)
export const isHeco = (chainId: string) => ['0x100', '0x80'].includes(chainId)
export const isVelas = (chainId: string) => ['0x6a', '0x6f'].includes(chainId)
export const isFantom = (chainId: string) => ['0xfa', '0xfa2'].includes(chainId)
export const isKava = (chainId: string) => ['0x8ae', '0x8ad'].includes(chainId)
export const isETH = (chainId: string) =>
  ['0x1', '0x5', '0xaa36a7'].includes(chainId)
export const isETC = (chainId: string) => ['0x3d', '0x3f'].includes(chainId)
export const isPLS = (chainId: string) => ['0x171'].includes(chainId)
export const isConflux = (chainId: string) => ['0x405'].includes(chainId)
export const isArbitrum = (chainId: string) =>
  ['0xa4b1', '0x66eed'].includes(chainId)
export const isBase = (chainId: string) => ['0x2105'].includes(chainId) // basechaindev
export const iszkSync = (chainId: string) => ['0x144'].includes(chainId)
export const mainnetIds = [
  '0x1',
  '0x38',
  '0xa86a',
  '0x89',
  '0x19',
  '0x80',
  '0x6a',
  '0xfa',
  '0x8ae',
  '0x3d',
  '0x171',
  '0xa4b1',
  '0x2105', // basechaindev
  '0x144',
  '0x405', // Conflux
  'algorand', // Algorand
  'casper', // Casper
  'tezos', // Tezos
]
export const testnetIds = [
  '0x3',
  '0x4',
  '0x5',
  '0xaa36a7',
  '0x61',
  '0xa869',
  '0x13881',
  '0x3ac',
  '0x152',
  '0x100',
  '0x6f',
  '0xfa2',
  '0x8ad',
  '0x3f',
  '0x66eed',
]
export const isMainnet = (chainId: string) => mainnetIds.includes(chainId)
export const isTestnet = (chainId: string) => testnetIds.includes(chainId)

export const eventsLockSuccess = (chainId: string) => {
  if (isBSC(chainId)) {
    if (isTestnet(chainId)) {
      return 'db_chain_bsct'
    }
    return 'db_chain_bsc'
  }
  if (isAVAX(chainId)) {
    return 'db_chain_avax'
  }
  if (isALGO(chainId)) {
    return 'db_chain_algo'
  }
  if (isMATIC(chainId)) {
    return 'db_chain_poly'
  }
  if (isPULSE(chainId)) {
    return 'db_chain_pulse'
  }
  if (isCronos(chainId)) {
    return 'db_chain_cronos'
  }
  if (isHeco(chainId)) {
    return 'db_chain_heco'
  }
  if (isVelas(chainId)) {
    return 'db_chain_velas'
  }
  if (isFantom(chainId)) {
    return 'db_chain_fantom'
  }
  if (isKava(chainId)) {
    if (isTestnet(chainId)) {
      return 'db_chain_kavat'
    }
    return 'db_chain_kava'
  }
  if (isETC(chainId)) {
    return 'db_chain_ethc'
  }
  if (isETH(chainId)) {
    if (isTestnet(chainId)) {
      // eslint-disable-next-line default-case
      switch (chainId) {
        case '0x5':
          return 'db_chain_goerlit'
        case '0xaa36a7':
          return 'db_chain_sepoliat'
      }
    }
    return 'db_chain_eth'
  }
  if (isArbitrum(chainId)) {
    if (isTestnet(chainId)) {
      return 'db_chain_arbt'
    }
    return 'db_chain_arb'
  }
  if (isBase(chainId)) {
    // basechaindev
    return 'db_chain_base'
  }
  if (iszkSync(chainId)) {
    return 'db_chain_zksync'
  }

  return 'db_chain_eth'
}

export const tokenRootSymbols = (chainId: string) => {
  if (isBSC(chainId)) {
    return 'BNB'
  }
  if (isAVAX(chainId)) {
    return 'AVAX'
  }
  if (isALGO(chainId)) {
    return 'ALGO'
  }
  if (isMATIC(chainId)) {
    return 'MATIC'
  }
  if (isPULSE(chainId)) {
    return 'TPLS'
  }
  if (isCronos(chainId)) {
    if (isTestnet(chainId)) {
      return 'TCRO'
    }
    return 'CRO'
  }
  if (isHeco(chainId)) {
    if (isTestnet(chainId)) {
      return 'HTT'
    }
    return 'HT'
  }
  if (isVelas(chainId)) {
    return 'VLX'
  }
  if (isFantom(chainId)) {
    return 'FTM'
  }
  if (isKava(chainId)) {
    return 'KAVA'
  }
  if (isETC(chainId)) {
    return 'ETC'
  }
  if (isPLS(chainId)) {
    return 'PLS'
  }
  if (isArbitrum(chainId)) {
    if (isTestnet(chainId)) {
      return 'AGOR'
    }
    return 'ETH'
  }
  if (isBase(chainId)) {
    return 'ETH'
  }
  if (iszkSync(chainId)) {
    return 'ETH'
  }
  if (isConflux(chainId)) {
    return 'CFX'
  }

  return 'ETH'
}

export const chainShortMetaTitles = (chainId: string) => {
  if (isBSC(chainId)) {
    return 'BNB'
  }
  if (isAVAX(chainId)) {
    return 'AVAX'
  }
  if (isALGO(chainId)) {
    return 'ALGO'
  }
  if (isMATIC(chainId)) {
    return 'MATIC'
  }
  if (isPULSE(chainId)) {
    return 'TPLS'
  }
  if (isCronos(chainId)) {
    if (isTestnet(chainId)) {
      return 'TCRO'
    }
    return 'CRO'
  }
  if (isHeco(chainId)) {
    if (isTestnet(chainId)) {
      return 'HTT'
    }
    return 'HT'
  }
  if (isVelas(chainId)) {
    return 'VLX'
  }
  if (isFantom(chainId)) {
    return 'FTM'
  }
  if (isKava(chainId)) {
    return 'KAVA'
  }
  if (isArbitrum(chainId)) {
    if (isTestnet(chainId)) {
      return 'AGOR'
    }
    return 'ARB'
  }
  if (isETH(chainId)) {
    return 'ETH'
  }
  if (isPLS(chainId)) {
    return 'PLS'
  }
  if (isBase(chainId)) {
    return 'ETH'
  }
  if (iszkSync(chainId)) {
    return 'ETH'
  }

  return ''
}

export const getChainTokenName = (chainId: string) => {
  if (isBSC(chainId)) {
    return 'BSC'
  }
  if (isAVAX(chainId)) {
    return 'AVAX'
  }
  if (isALGO(chainId)) {
    return 'ALGO'
  }
  if (isMATIC(chainId)) {
    return 'MATIC'
  }
  if (isPULSE(chainId)) {
    return 'PLS'
  }
  if (isCronos(chainId)) {
    return 'CRO'
  }
  if (isHeco(chainId)) {
    return 'HECO'
  }
  if (isVelas(chainId)) {
    return 'VELAS'
  }
  if (isFantom(chainId)) {
    return 'FANTOM'
  }
  if (isKava(chainId)) {
    return 'KAVA'
  }
  if (isArbitrum(chainId)) {
    return 'ARB'
  }
  if (isETH(chainId)) {
    return 'ETH'
  }
  if (isPLS(chainId)) {
    return 'PLS'
  }
  if (isBase(chainId)) {
    return 'ETH'
  }
  if (iszkSync(chainId)) {
    return 'ETH'
  }

  return ''
}

export const walletInfo = [
  {
    title: 'MetaMask',
    image: '/assets/wallet/metaMask@3x.png',
    connectionType: 'MetaMask',
    walletType: '/assets/wallet/right-arrow.svg',
    event: 'connect-wallet-metamask',
    eventDashboard: 'db_wallet_metamask',
  },
  {
    title: 'Wallet Connect',
    image: '/assets/wallet/walletConnect@3x.png',
    connectionType: 'WalletConnect',
    walletType: '/assets/wallet/qr-code-scan-icon.svg',
    event: 'connect-wallet-walletConnect',
    eventDashboard: 'db_wallet_walletconnect',
  },
  {
    title: 'Coinbase Wallet',
    image: '/assets/wallet/coinBase@3x.png',
    connectionType: 'Coinbase Wallet',
    walletType: '/assets/wallet/qr-code-scan-icon.svg',
    event: 'connect-wallet-coinbase',
    eventDashboard: 'db_wallet_coinbase',
  },
  // {
  //   title: 'Ledger',
  //   image: '/assets/wallet/ledger-logo-long.png',
  //   connectionType: 'Ledger',
  //   walletType: '/assets/wallet/right-arrow.svg',
  //   event: 'connect-wallet-ledger',
  //   eventDashboard: 'db_wallet_ledger',
  // },
]

/*
export const explorerTokensRest = (network: string, chainId: string) =>
  http.get('/app/explorer/tokens', {
    params: {
      network,
      chainId,
    },
  })

export const exploreInfoRest = (network: string, chainId: string) =>
  http.get('/app/explorer/info', {
    headers: {},
    params: {
      network,
      chainId,
    },
  })
*/

export const getUniswapV2SubraphAddress = (chainId: string) => {
  const address: Record<string, string> = {
    '0x1': 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
    '0x3':
      'https://api.thegraph.com/subgraphs/name/pollendefi/uniswap-v2-ropsten',
    '0x5':
      'https://api.thegraph.com/subgraphs/name/kennieharold/uniswap-v2-goerli',
    '0x38': 'https://api.thegraph.com/subgraphs/name/ookvic/pancakeswap-v2',
    '0x61': 'https://api.thegraph.com/subgraphs/name/ookvic/pancakeswap-v2',
    '0xa86a': 'https://cchain.explorer.avax.network/graphiql',
    '0xa869': 'https://cchain.explorer.avax-test.network/graphiql',
  }
  return address[chainId] || address['0x1']
}

export const getSushiswapV2SubraphAddress = (chainId: string) => {
  const address: Record<string, string> = {
    '0x1': 'https://api.thegraph.com/subgraphs/name/sushiswap/exchange',
    '0x5': 'https://api.thegraph.com/subgraphs/name/murtrax/sushiswap-goerli',
  }
  return address[chainId] || address['0x1']
}

export const getRadioShackV2SubraphAddress = (chainId: string) => {
  const address: Record<string, string> = {
    '0x1':
      'https://api.thegraph.com/subgraphs/name/murtrax/radioshack-ethereum',
  }
  return address[chainId] || address['0x1']
}

export const getShibaSwapV2SubraphAddress = (chainId: string) => {
  const address: Record<string, string> = {
    '0x1': 'https://api.thegraph.com/subgraphs/name/ronerizon/shibaswap',
  }
  return address[chainId] || address['0x1']
}

export const dexSearches = (chainId: string) => {
  const address: Record<string, Array<string>> = {
    '0x1': [
      // ETH
      'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2', // uniswap
      'https://api.thegraph.com/subgraphs/name/sushiswap/exchange', // sushiswap
      'https://api.thegraph.com/subgraphs/name/murtrax/radioshack-ethereum', // radioshack
      'https://api.thegraph.com/subgraphs/name/ronerizon/shibaswap', // shibaswap
    ],
    '0x5': [
      // GORELI ETH
      'https://api.thegraph.com/subgraphs/name/kennieharold/uniswap-v2-goerli', // uniswap
      'https://api.thegraph.com/subgraphs/name/murtrax/sushiswap-goerli', // sushiswap
    ],
    '0x38': [
      // BSC MAINNET
      'https://api.thegraph.com/subgraphs/name/ookvic/pancakeswap-v2', // pancake swap
      'https://api.thegraph.com/subgraphs/name/sushiswap/bsc-exchange', // sushi swap
      'https://api.thegraph.com/subgraphs/name/radioshackcreator/radioshack-bsc', // radioshack
    ],
    '0x61': [
      // BSC TESTNET
      'https://api.thegraph.com/subgraphs/name/ookvic/pancakeswap-v2', // pancake swap
    ],
    '0x89': [
      // POLYGON MAINNET
      'https://api.thegraph.com/subgraphs/name/sushiswap/matic-exchange', // sushi swap
      'https://api.thegraph.com/subgraphs/name/radioshackcreator/radioshack-polygon', // radioshack
      'https://api.thegraph.com/subgraphs/name/murtrax/quickswap-polygon', // quickswap
    ],
    '0xa86a': [
      // AVAX MAINNET
      'https://cchain.explorer.avax.network/graphiql', // avax
      'https://api.thegraph.com/subgraphs/name/sushiswap/avalanche-exchange', // sushi swap
      'https://api.thegraph.com/subgraphs/name/pangolindex/exchange', // pangolin dex
      'https://api.thegraph.com/subgraphs/name/murtrax/radioshack-avax', // radioshack
      'https://api.thegraph.com/subgraphs/name/traderjoe-xyz/exchange', // traderjoe
    ],
    '0xa869': [
      // AVAX TESTNET
      'https://cchain.explorer.avax-test.network/graphiql', // avax
    ],
    '0xfa2': [
      // FANTOM
      'https://api.thegraph.com/subgraphs/name/sushiswap/fantom-exchange', // sushi swap
    ],
  }
  return address[chainId] || address['0x1']
}

export const getUniswapV3SubraphAddress = (chainId: string) => {
  const address: Record<string, string> = {
    '0x1': 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
    '0x3': 'https://api.thegraph.com/subgraphs/name/muranox/uniswap-v3-ropsten',
    '0x5': 'https://api.thegraph.com/subgraphs/name/liqwiz/uniswap-v3-goerli',
    '0xaa36a7':
      'https://api.thegraph.com/subgraphs/name/0xtarc/uniswap-v3-sepolia',
    '0x4': 'https://api.thegraph.com/subgraphs/name/fico23/v3-rinkeby',
    '0x89': 'https://api.thegraph.com/subgraphs/name/muranox/uniswap-v3-matic',
    '0x13881':
      'https://api.thegraph.com/subgraphs/name/find-price/uniswap-v3-mumbai',
    '0x38':
      'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-bsc',
  }
  return address[chainId] || address['0x1']
}

export const getUniswapV3ForksByChainId = (chainId: string) => {
  const univ3Forks: Record<
    string,
    Array<{ name: string; subgraphUrl: string; nftAddress: string }>
  > = {
    '0x1': [
      {
        name: 'Uniswap-V3', // working 4th-July-2023
        subgraphUrl:
          'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
        nftAddress: '0xc36442b4a4522e871399cd717abdd847ab11fe88'.toLowerCase(),
      },
      {
        name: 'PancakeSwap-V3', // working 4th-July-2023
        subgraphUrl:
          'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-eth',
        nftAddress: '0x46A15B0b27311cedF172AB29E4f4766fbE7F4364'.toLowerCase(),
      },
      {
        name: 'SushiSwap-V3', // working 4th-July-2023
        subgraphUrl:
          'https://api.thegraph.com/subgraphs/name/sushi-v3/v3-ethereum',
        nftAddress: '0x2214A42d8e2A1d20635c2cb0664422c528B6A432'.toLowerCase(),
      },
    ],
    '0x5': [
      {
        name: 'Uniswap-V3', // working 4th-July-2023
        subgraphUrl:
          'https://api.thegraph.com/subgraphs/name/0xfind/uniswap-v3-goerli',
        nftAddress: '0xc36442b4a4522e871399cd717abdd847ab11fe88'.toLowerCase(),
      },
    ],
    '0x38': [
      {
        name: 'PancakeSwap-V3', // working 4th-July-2023
        subgraphUrl:
          'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-bsc',
        nftAddress: '0x46A15B0b27311cedF172AB29E4f4766fbE7F4364'.toLowerCase(),
      },
      {
        name: 'Uniswap-V3', // working 4th-July-2023
        subgraphUrl:
          'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-bsc',
        nftAddress: '0x7b8A01B39D58278b5DE7e48c8449c9f4F5170613'.toLowerCase(),
      },
      {
        name: 'SushiSwap-V3', // working 4th-July-2023
        subgraphUrl: 'https://api.thegraph.com/subgraphs/name/sushi-v3/v3-bsc',
        nftAddress: '0xF70c086618dcf2b1A461311275e00D6B722ef914'.toLowerCase(),
      },
    ],
    '0x89': [
      {
        name: 'QuickSwap-V3', // working 4th-July-2023
        subgraphUrl:
          'https://api.thegraph.com/subgraphs/name/sameepsi/quickswap-v3',
        nftAddress: '0x8eF88E4c7CfbbaC1C163f7eddd4B578792201de6'.toLowerCase(),
      },
      {
        name: 'Uniswap-V3', // working 4th-July-2023
        subgraphUrl:
          'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon',
        nftAddress: '0xc36442b4a4522e871399cd717abdd847ab11fe88'.toLowerCase(),
      },
      {
        name: 'SushiSwap-V3', // working 4th-July-2023
        subgraphUrl:
          'https://api.thegraph.com/subgraphs/name/sushi-v3/v3-polygon',
        nftAddress: '0xb7402ee99F0A008e461098AC3A27F4957Df89a40'.toLowerCase(),
      },
    ],
    '0xa4b1': [
      // {
      //   name: "Uniswap-V3", // Issues with uniswap-v3 subgraph on ARBITRUM
      //   subgraphUrl: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-arbitrum-one',
      //   nftAddress: '0xc36442b4a4522e871399cd717abdd847ab11fe88'.toLowerCase()
      // },
      {
        name: 'SushiSwap-V3', // working 4th-July-2023
        subgraphUrl:
          'https://api.thegraph.com/subgraphs/name/sushi-v3/v3-arbitrum',
        nftAddress: '0xF0cBce1942A68BEB3d1b73F0dd86C8DCc363eF49'.toLowerCase(),
      },
    ],
    '0x2105': [
      {
        name: 'Uniswap-V3', // working 22nd-August-2023
        subgraphUrl:
          'https://api.thegraph.com/subgraphs/name/kalinbas/uniswap-v3-base',
        nftAddress: '0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1'.toLowerCase(),
      },
    ],
  }
  return univ3Forks[chainId] || univ3Forks['0x1']
}

export const positionContractAddress = (chainId: string): `0x${string}` => {
  const address: Record<string, `0x${string}`> = {
    '0x1': '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    '0x3': '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    '0x4': '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    '0x5': '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    '0xaa36a7': '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    '0x89': '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    '0x13881': '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    '0x38': '0x46A15B0b27311cedF172AB29E4f4766fbE7F4364',
    '0x61': '0x427bF5b37357632377eCbEC9de3626C71A5396c1',
    '0xa4b1': '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    '0x2105': '0xC36442b4a4522E871399CD717aBDD847Ab11FE88', // BASE_UPDATE_CONTRACT // basechaindev
    '0x144': '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
  }

  return address[chainId] || address['0x1']
}

export const nameLiquidity = (chainId: string) => {
  if (isBSC(chainId)) {
    return 'Pancake LPs'
  }
  if (isAVAX(chainId)) {
    return 'Avalanche'
  }
  return 'Uniswap V2'
}

export const nameSymbolLiquidity = (chainId: string) => {
  if (isBSC(chainId)) {
    return 'Cake-LP'
  }
  if (isAVAX(chainId)) {
    return 'Avax'
  }
  return 'UNI-V2'
}

export const etherscanNetworkUrl = (chainId: string) => {
  const address: Record<string, string> = {
    '0x1': 'https://etherscan.io/',
    '0x3': 'https://ropsten.etherscan.io/',
    '0x4': 'https://rinkeby.etherscan.io/',
    '0x5': 'https://goerli.etherscan.io/',
    '0xaa36a7': 'https://sepolia.etherscan.io/',
    '0x2a': 'https://kovan.etherscan.io/',
    '0x38': 'https://bscscan.com/',
    '0x61': 'https://testnet.bscscan.com/',
    '0xa86a': 'https://cchain.explorer.avax.network/',
    '0xa869': 'https://cchain.explorer.avax-test.network/',
    '0xmain': `https://algoexplorer.io/`,
    '0xtest': `https://testnet.algoexplorer.io/`,
    '0x89': `https://polygonscan.com/`,
    '0x13881': `https://mumbai.polygonscan.com/`,
    '0x171': `https://scan.pulsechain.com/`,
    '0x152': `https://cronos.crypto.org/explorer/testnet3/`,
    '0x19': `https://cronos.crypto.org/explorer/`,
    '0x80': `https://hecoinfo.com/`,
    '0x100': `https://testnet.hecoinfo.com/`,
    '0x6f': `https://evmexplorer.testnet.velas.com/`,
    '0x6a': `https://evmexplorer.velas.com/`,
    '0xfa': `https://ftmscan.com/`,
    '0xfa2': `https://testnet.ftmscan.com/`,
    '0x8ae': `https://explorer.kava.io/`,
    '0x8ad': `https://explorer.testnet.kava.io/`,
    '0xa4b1': `https://arbiscan.io/`,
    '0x66eed': `https://testnet.arbiscan.io/`,
    '0x2105': `https://base.blockscout.com/`, // basechaindev
    '0x144': `https://explorer.zksync.io/`,
  }

  return address[chainId] || address['0x1']
}

export const viewTXUrl = (chainId: string, hash: string) => {
  const urls: Record<string, string> = {
    '0x1': `https://etherscan.io/tx/${hash}`,
    '0x3': `https://ropsten.etherscan.io/tx/${hash}`,
    '0x4': `https://rinkeby.etherscan.io/tx/${hash}`,
    '0x5': `https://goerli.etherscan.io/tx/${hash}`,
    '0xaa36a7': `https://sepolia.etherscan.io/tx/${hash}`,
    '0x38': `https://bscscan.com/tx/${hash}`,
    '0x61': `https://testnet.bscscan.com/tx/${hash}`,
    '0xa86a': `https://cchain.explorer.avax.network/tx/${hash}`,
    '0xa869': `https://cchain.explorer.avax-test.network/tx/${hash}`,
    '0xmain': `https://algoexplorer.io/tx/${hash}`,
    '0xtest': `https://testnet.algoexplorer.io/tx/${hash}`,
    '0x89': `https://polygonscan.com/tx/${hash}`,
    '0x13881': `https://mumbai.polygonscan.com/tx/${hash}`,
    '0x171': `https://scan.pulsechain.com/tx/${hash}`,
    '0x152': `https://cronos.crypto.org/explorer/testnet3/tx/${hash}`,
    '0x19': `https://cronos.crypto.org/explorer/tx/${hash}`,
    '0x100': `https://testnet.hecoinfo.com/tx/${hash}`,
    '0x80': `https://hecoinfo.com/tx/${hash}`,
    '0x6f': `https://evmexplorer.testnet.velas.com/tx/${hash}/token-transfers`,
    '0x6a': `https://evmexplorer.velas.com/tx/${hash}/token-transfers`,
    '0xfa': `https://ftmscan.com/tx/${hash}`,
    '0xfa2': `https://testnet.ftmscan.com/tx/${hash}`,
    '0x8ae': `https://explorer.kava.io/tx/${hash}`,
    '0x8ad': `https://explorer.testnet.kava.io/tx/${hash}`,
    '0xa4b1': `https://arbiscan.io/tx/${hash}`,
    '0x66eed': `https://testnet.arbiscan.io/tx/${hash}`,
    '0x2105': `https://base.blockscout.com/tx/${hash}`, // basechaindev
    '0x144': `https://explorer.zksync.io/tx/${hash}`,
  }
  return urls[chainId] || urls['0x1']
}

export const chainIdToHex = (chainId: number) =>
  chainId ? `0x${chainId.toString(16)}` : ''

export function removeDuplicateLocks(data: any) {
  const uniques: Array<any> = []
  data.forEach((value: any) => {
    const pos = uniques.findIndex(
      (a) =>
        a.event.lockContractAddress === value.event.lockContractAddress &&
        a.event.lockDepositId === value.event.lockDepositId &&
        a.event.unlockTime === value.event.unlockTime
    )
    if (pos === -1) {
      uniques.push(value)
    } else if (uniques[pos].event.unlockTime < value.event.unlockTime) {
      uniques[pos] = value
    }
  })
  return uniques
}

export function removeDuplicateVestings(data: any) {
  const uniques: Array<any> = []
  data.forEach((value: any) => {
    const pos = uniques.findIndex(
      (a) =>
        a.merkleRoot.toLowerCase() === value.merkleRoot.toLowerCase() &&
        a.address.toLowerCase() === value.address.toLowerCase()
    )
    if (pos === -1) {
      uniques.push(value)
    }
  })
  return uniques
}

export const oldContactAddress = {
  '0x1': '0xdbf72370021babafbceb05ab10f99ad275c6220a',
  '0x3': '0x7f207d66240fbe8db3f764f6056b6be8725cc90a',
}

export const isPostMintLockNFTSupported = (
  chainId: string,
  lockTokenAddress: string
) => {
  switch (chainId) {
    // ETH MAINNET
    case '0x1': {
      switch (lockTokenAddress) {
        case '0xe2fe530c047f2d85298b07d9333c05737f1435fb':
          return true
        default:
          return false
      }
    }
    // ROPSTEN TESTNET
    case '0x3': {
      switch (lockTokenAddress) {
        case '0xe8f58f1f072f720dfba60b5724e78831de262b6c':
          return true
        case '0xb8acee60aa9831cb503e60a725152df234524be8':
          return true
        default:
          return false
      }
    }
    // RINKEBY TESTNET
    case '0x4': {
      switch (lockTokenAddress) {
        case '0x80825C93a9E7C9FBF05eE32d629636e4BFb2C9FE':
          return true
        default:
          return false
      }
    }
    // GOERLI TESTNET
    case '0x5': {
      switch (lockTokenAddress) {
        case '0x256c6f9823c9107900a0f35d041247882cb88efd':
          return true
        default:
          return false
      }
    }
    // SEPOLIA TESTNET
    case '0xaa36a7': {
      switch (lockTokenAddress) {
        case '0x4f0fd563be89ec8c3e7d595bf3639128c0a7c33a':
          return true
        default:
          return false
      }
    }
    // BSC MAINNET
    case '0x38': {
      switch (lockTokenAddress) {
        case '0x0c89c0407775dd89b12918b9c0aa42bf96518820':
          return true
        default:
          return false
      }
    }
    // BSC TESTNET
    case '0x61': {
      switch (lockTokenAddress) {
        case '0xdf68ad003175883c97c10f37681613dc6a9b278a':
          return true
        case '0x8e89f184a549dc8f56728e4787b6157af77ec35e':
          return true
        default:
          return false
      }
    }
    // AVAX MAINNET
    case '0xa86a': {
      switch (lockTokenAddress) {
        case '0xe2fe530c047f2d85298b07d9333c05737f1435fb':
          return true
        default:
          return false
      }
    }
    // AVAX TESTNET
    case '0xa869': {
      switch (lockTokenAddress) {
        case '0xc79b22cf9bde5b6441ae1ad713aec0aa8cf9e19d':
          return true
        default:
          return false
      }
    }
    // CONFLUX MAINNET
    case '0xmain': {
      switch (lockTokenAddress) {
        default:
          return false
      }
    }
    // CONFLUX TESTNET
    case '0xtest': {
      switch (lockTokenAddress) {
        default:
          return false
      }
    }
    // POLYGON MAINNET
    case '0x89': {
      switch (lockTokenAddress) {
        case '0x3ef7442df454ba6b7c1deec8ddf29cfb2d6e56c7':
          return true
        default:
          return false
      }
    }
    // MUMBAI(POLYGON) TESTNET
    case '0x13881': {
      switch (lockTokenAddress) {
        case '0x0891b3728ba802e5240ae3552749eb23093ed2d5':
          return true
        default:
          return false
      }
    }
    // PULSECHAIN TESTNET
    case '0x3ad': {
      switch (lockTokenAddress) {
        default:
          return false
      }
    }
    // CRONOS TESTNET
    case '0x152': {
      switch (lockTokenAddress) {
        case '0xc79b22cf9bde5b6441ae1ad713aec0aa8cf9e19d':
          return true
        default:
          return false
      }
    }
    // CRONOS MAINNET
    case '0x19': {
      switch (lockTokenAddress) {
        case '0x4f0fd563be89ec8c3e7d595bf3639128c0a7c33a':
          return true
        default:
          return false
      }
    }
    // HECO MAINNET
    case '0x80': {
      switch (lockTokenAddress) {
        case '0xe2fe530c047f2d85298b07d9333c05737f1435fb':
          return true
        default:
          return false
      }
    }
    // HECO TESTNET
    case '0x100': {
      switch (lockTokenAddress) {
        case '0xc79b22cf9bde5b6441ae1ad713aec0aa8cf9e19d':
          return true
        default:
          return false
      }
    }
    // VELAS MAINNET
    case '0x6a': {
      switch (lockTokenAddress) {
        case '0xe2fe530c047f2d85298b07d9333c05737f1435fb':
          return true
        default:
          return false
      }
    }
    // VELAS TESTNET
    case '0x6f': {
      switch (lockTokenAddress) {
        case '0xc79b22cf9bde5b6441ae1ad713aec0aa8cf9e19d':
          return true
        default:
          return false
      }
    }
    // FANTOM MAINNET
    case '0xfa': {
      switch (lockTokenAddress) {
        case '0xCCEBbE9e2b8f46C2C6862238e60a396AF790B63e':
          return true
        default:
          return false
      }
    }
    // FANTOM TESTNET
    case '0xfa2': {
      switch (lockTokenAddress) {
        case '0xc79b22cf9bde5b6441ae1ad713aec0aa8cf9e19d':
          return true
        default:
          return false
      }
    }
    // ETC MAINNET
    case '0x3d': {
      switch (lockTokenAddress) {
        default:
          return false
      }
    }
    // ETC TESTNET
    case '0x3f': {
      switch (lockTokenAddress) {
        default:
          return false
      }
    }
    // KAVA MAINNET
    case '0x8ae': {
      switch (lockTokenAddress) {
        case '0xa9ec655dac35d989c0c8be075b1106dcd32502d6':
          return true
        default:
          return false
      }
    }
    // KAVA TESTNET
    case '0x8ad': {
      switch (lockTokenAddress) {
        case '0xd883fbb2db56a837d671f9a50ab10ab683ce1770':
          return true
        default:
          return false
      }
    }
    case '0x171': {
      switch (lockTokenAddress) {
        case '0xe2fe530c047f2d85298b07d9333c05737f1435fb':
          return true
        default:
          return false
      }
    }
    // ARBITRUM MAINNET
    case '0xa4b1': {
      switch (lockTokenAddress) {
        case '0xe0b0d2021293bee9715e1db3be31b55c00f72a75':
          return true
        default:
          return false
      }
    }
    // ARBITRUM TESTNET
    case '0x66eed': {
      switch (lockTokenAddress) {
        case '0x6fd300cd12f30e1cbe4fd7baf9df7874a18531bb':
          return true
        default:
          return false
      }
    }
    // BASE MAINNET // basechaindev
    case '0x2105': {
      switch (lockTokenAddress) {
        case '0x4f0fd563be89ec8c3e7d595bf3639128c0a7c33a': // BASE_UPDATE_CONTRACT
          return true
        default:
          return false
      }
    }

    // ZKSYNC MAINNET
    case '0x144': {
      switch (lockTokenAddress) {
        case '0xE6fcefa80C6eEc28b2682EbB6b4b476E7F2b9Bdf': // BASE_UPDATE_CONTRACT
          return true
        default:
          return false
      }
    }

    default:
      return false
  }
}

export const splitTokenSupportedLockContract = (
  chainId: string,
  lockTokenAddress: string
) => {
  switch (chainId) {
    // ETH MAINNET
    case '0x1': {
      switch (lockTokenAddress) {
        case '0xe2fe530c047f2d85298b07d9333c05737f1435fb':
          return true
        default:
          return false
      }
    }
    // ROPSTEN TESTNET
    case '0x3': {
      switch (lockTokenAddress) {
        case '0xe8f58f1f072f720dfba60b5724e78831de262b6c':
          return true
        case '0xb8acee60aa9831cb503e60a725152df234524be8':
          return true
        default:
          return false
      }
    }
    // GOERLI TESTNET
    case '0x5': {
      switch (lockTokenAddress) {
        case '0x256c6f9823c9107900a0f35d041247882cb88efd':
          return true
        default:
          return false
      }
    }
    // SEPOLIA TESTNET
    case '0xaa36a7': {
      switch (lockTokenAddress) {
        case '0x4f0fd563be89ec8c3e7d595bf3639128c0a7c33a':
          return true
        default:
          return false
      }
    }
    // BSC MAINNET
    case '0x38': {
      switch (lockTokenAddress) {
        case '0x0c89c0407775dd89b12918b9c0aa42bf96518820':
          return true
        default:
          return false
      }
    }
    // BSC TESTNET
    case '0x61': {
      switch (lockTokenAddress) {
        case '0xdf68ad003175883c97c10f37681613dc6a9b278a':
          return true
        case '0x8e89f184a549dc8f56728e4787b6157af77ec35e':
          return true
        default:
          return false
      }
    }
    // AVAX MAINNET
    case '0xa86a': {
      switch (lockTokenAddress) {
        case '0xe2fe530c047f2d85298b07d9333c05737f1435fb':
          return true
        default:
          return false
      }
    }
    // AVAX TESTNET
    case '0xa869': {
      switch (lockTokenAddress) {
        case '0xc79b22cf9bde5b6441ae1ad713aec0aa8cf9e19d':
          return true
        default:
          return false
      }
    }
    // CONFLUX MAINNET
    case '0xmain': {
      switch (lockTokenAddress) {
        default:
          return false
      }
    }
    // CONFLUX TESTNET
    case '0xtest': {
      switch (lockTokenAddress) {
        default:
          return false
      }
    }
    // POLYGON MAINNET
    case '0x89': {
      switch (lockTokenAddress) {
        case '0x3ef7442df454ba6b7c1deec8ddf29cfb2d6e56c7':
          return true
        default:
          return false
      }
    }
    // MUMBAI(POLYGON) TESTNET
    case '0x13881': {
      switch (lockTokenAddress) {
        case '0x0891b3728ba802e5240ae3552749eb23093ed2d5':
          return true
        default:
          return false
      }
    }
    // PULSECHAIN TESTNET
    case '0x3ad': {
      switch (lockTokenAddress) {
        case '0x9f726019452d65a120e1f7ae6b937ee9ebd72440':
          return true
        default:
          return false
      }
    }
    // CRONOS TESTNET
    case '0x152': {
      switch (lockTokenAddress) {
        case '0xc79b22cf9bde5b6441ae1ad713aec0aa8cf9e19d':
          return true
        default:
          return false
      }
    }
    // CRONOS MAINNET
    case '0x19': {
      switch (lockTokenAddress) {
        case '0x4f0fd563be89ec8c3e7d595bf3639128c0a7c33a':
          return true
        default:
          return false
      }
    }
    // HECO MAINNET
    case '0x80': {
      switch (lockTokenAddress) {
        case '0xe2fe530c047f2d85298b07d9333c05737f1435fb':
          return true
        default:
          return false
      }
    }
    // HECO TESTNET
    case '0x100': {
      switch (lockTokenAddress) {
        case '0xc79b22cf9bde5b6441ae1ad713aec0aa8cf9e19d':
          return true
        default:
          return false
      }
    }
    // VELAS MAINNET
    case '0x6a': {
      switch (lockTokenAddress) {
        case '0xe2fe530c047f2d85298b07d9333c05737f1435fb':
          return true
        default:
          return false
      }
    }
    // VELAS TESTNET
    case '0x6f': {
      switch (lockTokenAddress) {
        case '0xc79b22cf9bde5b6441ae1ad713aec0aa8cf9e19d':
          return true
        default:
          return false
      }
    }
    // FANTOM MAINNET
    case '0xfa': {
      switch (lockTokenAddress) {
        case '0xCCEBbE9e2b8f46C2C6862238e60a396AF790B63e':
          return true
        default:
          return false
      }
    }
    // FANTOM TESTNET
    case '0xfa2': {
      switch (lockTokenAddress) {
        case '0xc79b22cf9bde5b6441ae1ad713aec0aa8cf9e19d':
          return true
        default:
          return false
      }
    }
    // ETC MAINNET
    case '0x3d': {
      switch (lockTokenAddress) {
        case '0x586c21a779c24efd2a8af33c9f7df2a2ea9af55c':
          return true
        default:
          return false
      }
    }
    // ETC TESTNET
    case '0x3f': {
      switch (lockTokenAddress) {
        case '0x2ea28a07b82701b76de450c67aa7a4259bc4c75e':
          return true
        default:
          return false
      }
    }
    // KAVA MAINNET
    case '0x8ae': {
      switch (lockTokenAddress) {
        case '0xa9ec655dac35d989c0c8be075b1106dcd32502d6':
          return true
        default:
          return false
      }
    }
    // KAVA TESTNET
    case '0x8ad': {
      switch (lockTokenAddress) {
        case '0xd883fbb2db56a837d671f9a50ab10ab683ce1770':
          return true
        default:
          return false
      }
    }
    // PULSECHAIN MAINNET
    case '0x171': {
      switch (lockTokenAddress) {
        case '0xe2fe530c047f2d85298b07d9333c05737f1435fb':
          return true
        default:
          return false
      }
    }
    // ARBITRUM MAINNET
    case '0xa4b1': {
      switch (lockTokenAddress) {
        case '0xe0b0d2021293bee9715e1db3be31b55c00f72a75':
          return true
        default:
          return false
      }
    }
    // ARBITRUM TESTNET
    case '0x66eed': {
      switch (lockTokenAddress) {
        case '0x6fd300cd12f30e1cbe4fd7baf9df7874a18531bb':
          return true
        default:
          return false
      }
    }

    // BASE  MAINNET // basechaindev
    case '0x2105': {
      switch (lockTokenAddress) {
        case '0x4f0fd563be89ec8c3e7d595bf3639128c0a7c33a': // BASE_UPDATE_CONTRACT
          return true
        default:
          return false
      }
    }
    // ZKSYNC MAINNET
    case '0x144': {
      switch (lockTokenAddress) {
        case '0xE6fcefa80C6eEc28b2682EbB6b4b476E7F2b9Bdf': // BASE_UPDATE_CONTRACT
          return true
        default:
          return false
      }
    }

    default:
      return false
  }
}

export const partialWithdrawSupportedLockContract = (
  chainId: string,
  lockTokenAddress: string
) => {
  switch (chainId) {
    // ETH MAINNET
    case '0x1': {
      switch (lockTokenAddress) {
        case '0xe2fe530c047f2d85298b07d9333c05737f1435fb':
          return true
        default:
          return false
      }
    }
    // ROPSTEN TESTNET
    case '0x3': {
      switch (lockTokenAddress) {
        case '0xe8f58f1f072f720dfba60b5724e78831de262b6c':
          return true
        case '0xb8acee60aa9831cb503e60a725152df234524be8':
          return true
        default:
          return false
      }
    }
    // GOERLI TESTNET
    case '0x5': {
      switch (lockTokenAddress) {
        case '0x256c6f9823c9107900a0f35d041247882cb88efd':
          return true
        default:
          return false
      }
    }
    // SEPOLIA TESTNET
    case '0xaa36a7': {
      switch (lockTokenAddress) {
        case '0x4f0fd563be89ec8c3e7d595bf3639128c0a7c33a':
          return true
        default:
          return false
      }
    }
    // BSC MAINNET
    case '0x38': {
      switch (lockTokenAddress) {
        case '0x0c89c0407775dd89b12918b9c0aa42bf96518820':
          return true
        default:
          return false
      }
    }
    // BSC TESTNET
    case '0x61': {
      switch (lockTokenAddress) {
        case '0xdf68ad003175883c97c10f37681613dc6a9b278a':
          return true
        case '0x8e89f184a549dc8f56728e4787b6157af77ec35e':
          return true
        default:
          return false
      }
    }
    // AVAX MAINNET
    case '0xa86a': {
      switch (lockTokenAddress) {
        case '0xe2fe530c047f2d85298b07d9333c05737f1435fb':
          return true
        default:
          return false
      }
    }
    // AVAX TESTNET
    case '0xa869': {
      switch (lockTokenAddress) {
        case '0xc79b22cf9bde5b6441ae1ad713aec0aa8cf9e19d':
          return true
        default:
          return false
      }
    }
    // CONFLUX MAINNET
    case '0xmain': {
      switch (lockTokenAddress) {
        default:
          return false
      }
    }
    // CONFLUX TESTNET
    case '0xtest': {
      switch (lockTokenAddress) {
        default:
          return false
      }
    }
    // POLYGON MAINNET
    case '0x89': {
      switch (lockTokenAddress) {
        case '0x3ef7442df454ba6b7c1deec8ddf29cfb2d6e56c7':
          return true
        default:
          return false
      }
    }
    // MUMBAI(POLYGON) TESTNET
    case '0x13881': {
      switch (lockTokenAddress) {
        case '0x0891b3728ba802e5240ae3552749eb23093ed2d5':
          return true
        default:
          return false
      }
    }
    // PULSECHAIN TESTNET
    case '0x3ad': {
      switch (lockTokenAddress) {
        case '0x9f726019452d65a120e1f7ae6b937ee9ebd72440':
          return true
        default:
          return false
      }
    }
    // CRONOS TESTNET
    case '0x152': {
      switch (lockTokenAddress) {
        case '0xc79b22cf9bde5b6441ae1ad713aec0aa8cf9e19d':
          return true
        default:
          return false
      }
    }
    // CRONOS MAINNET
    case '0x19': {
      switch (lockTokenAddress) {
        case '0x4f0fd563be89ec8c3e7d595bf3639128c0a7c33a':
          return true
        default:
          return false
      }
    }
    // HECO MAINNET
    case '0x80': {
      switch (lockTokenAddress) {
        case '0xe2fe530c047f2d85298b07d9333c05737f1435fb':
          return true
        default:
          return false
      }
    }
    // HECO TESTNET
    case '0x100': {
      switch (lockTokenAddress) {
        case '0xc79b22cf9bde5b6441ae1ad713aec0aa8cf9e19d':
          return true
        default:
          return false
      }
    }
    // VELAS MAINNET
    case '0x6a': {
      switch (lockTokenAddress) {
        case '0xe2fe530c047f2d85298b07d9333c05737f1435fb':
          return true
        default:
          return false
      }
    }
    // VELAS TESTNET
    case '0x6f': {
      switch (lockTokenAddress) {
        case '0xc79b22cf9bde5b6441ae1ad713aec0aa8cf9e19d':
          return true
        default:
          return false
      }
    }
    // FANTOM MAINNET
    case '0xfa': {
      switch (lockTokenAddress) {
        case '0xccebbe9e2b8f46c2c6862238e60a396af790b63e':
          return true
        default:
          return false
      }
    }
    // FANTOM TESTNET
    case '0xfa2': {
      switch (lockTokenAddress) {
        case '0xc79b22cf9bde5b6441ae1ad713aec0aa8cf9e19d':
          return true
        default:
          return false
      }
    }
    // ETC MAINNET
    case '0x3d': {
      switch (lockTokenAddress) {
        case '0x586c21a779c24efd2a8af33c9f7df2a2ea9af55c':
          return true
        default:
          return false
      }
    }
    // ETC TESTNET
    case '0x3f': {
      switch (lockTokenAddress) {
        case '0x2ea28a07b82701b76de450c67aa7a4259bc4c75e':
          return true
        default:
          return false
      }
    }
    // KAVA MAINNET
    case '0x8ae': {
      switch (lockTokenAddress) {
        case '0xa9ec655dac35d989c0c8be075b1106dcd32502d6':
          return true
        default:
          return false
      }
    }
    // KAVA TESTNET
    case '0x8ad': {
      switch (lockTokenAddress) {
        case '0xd883fbb2db56a837d671f9a50ab10ab683ce1770':
          return true
        default:
          return false
      }
    }
    // PULSECHAIN MAINNET
    case '0x171': {
      switch (lockTokenAddress) {
        case '0xe2fe530c047f2d85298b07d9333c05737f1435fb':
          return true
        default:
          return false
      }
    }
    // ARBITRUM MAINNET
    case '0xa4b1': {
      switch (lockTokenAddress) {
        case '0xe0b0d2021293bee9715e1db3be31b55c00f72a75':
          return true
        default:
          return false
      }
    }
    // ARBITRUM TESTNET
    case '0x66eed': {
      switch (lockTokenAddress) {
        case '0x6fd300cd12f30e1cbe4fd7baf9df7874a18531bb':
          return true
        default:
          return false
      }
    }
    // BASE MAINNET // basechaindev
    case '0x2105': {
      switch (lockTokenAddress) {
        case '0x4f0fd563be89ec8c3e7d595bf3639128c0a7c33a': // BASE_UPDATE_CONTRACT
          return true
        default:
          return false
      }
    }

    // ZKSYNC MAINNET
    case '0x144': {
      switch (lockTokenAddress) {
        case '0xe6fcefa80c6eec28b2682ebb6b4b476e7f2b9bdf': // BASE_UPDATE_CONTRACT
          return true
        default:
          return false
      }
    }

    default:
      return false
  }
}

export const referralAddressSupportedLockContract = (
  chainId: string,
  lockTokenAddress: string
) => {
  switch (chainId) {
    // ETH MAINNET
    case '0x1': {
      switch (lockTokenAddress) {
        case '0xe2fe530c047f2d85298b07d9333c05737f1435fb':
          return true
        default:
          return false
      }
    }
    // ROPSTEN TESTNET
    case '0x3': {
      switch (lockTokenAddress) {
        case '0xe8f58f1f072f720dfba60b5724e78831de262b6c':
          return false
        case '0xb8acee60aa9831cb503e60a725152df234524be8':
          return false
        default:
          return false
      }
    }
    // GOERLI TESTNET
    case '0x5': {
      switch (lockTokenAddress) {
        case '0x256c6f9823c9107900a0f35d041247882cb88efd':
          return true
        default:
          return false
      }
    }
    // SEPOLIA TESTNET
    case '0xaa36a7': {
      switch (lockTokenAddress) {
        case '0x4f0fd563be89ec8c3e7d595bf3639128c0a7c33a':
          return true
        default:
          return false
      }
    }
    // BSC MAINNET
    case '0x38': {
      switch (lockTokenAddress) {
        case '0x0c89c0407775dd89b12918b9c0aa42bf96518820':
          return true
        default:
          return false
      }
    }
    // BSC TESTNET
    case '0x61': {
      switch (lockTokenAddress) {
        case '0xdf68ad003175883c97c10f37681613dc6a9b278a':
          return true
        case '0x8e89f184a549dc8f56728e4787b6157af77ec35e':
          return true
        default:
          return false
      }
    }
    // AVAX MAINNET
    case '0xa86a': {
      switch (lockTokenAddress) {
        case '0xe2fe530c047f2d85298b07d9333c05737f1435fb':
          return false
        default:
          return false
      }
    }
    // AVAX TESTNET
    case '0xa869': {
      switch (lockTokenAddress) {
        case '0xc79b22cf9bde5b6441ae1ad713aec0aa8cf9e19d':
          return false
        default:
          return false
      }
    }
    // CONFLUX MAINNET
    case '0xmain': {
      switch (lockTokenAddress) {
        default:
          return false
      }
    }
    // CONFLUX TESTNET
    case '0xtest': {
      switch (lockTokenAddress) {
        default:
          return false
      }
    }
    // POLYGON MAINNET
    case '0x89': {
      switch (lockTokenAddress) {
        case '0x3ef7442df454ba6b7c1deec8ddf29cfb2d6e56c7':
          return true
        default:
          return false
      }
    }
    // MUMBAI(POLYGON) TESTNET
    case '0x13881': {
      switch (lockTokenAddress) {
        case '0x0891b3728ba802e5240ae3552749eb23093ed2d5':
          return false
        default:
          return false
      }
    }
    // PULSECHAIN TESTNET
    case '0x3ad': {
      switch (lockTokenAddress) {
        case '0x9f726019452d65a120e1f7ae6b937ee9ebd72440':
          return false
        default:
          return false
      }
    }
    // CRONOS TESTNET
    case '0x152': {
      switch (lockTokenAddress) {
        case '0xc79b22cf9bde5b6441ae1ad713aec0aa8cf9e19d':
          return false
        default:
          return false
      }
    }
    // CRONOS MAINNET
    case '0x19': {
      switch (lockTokenAddress) {
        case '0x4f0fd563be89ec8c3e7d595bf3639128c0a7c33a':
          return true
        default:
          return false
      }
    }
    // HECO MAINNET
    case '0x80': {
      switch (lockTokenAddress) {
        case '0xe2fe530c047f2d85298b07d9333c05737f1435fb':
          return true
        default:
          return false
      }
    }
    // HECO TESTNET
    case '0x100': {
      switch (lockTokenAddress) {
        case '0xc79b22cf9bde5b6441ae1ad713aec0aa8cf9e19d':
          return false
        default:
          return false
      }
    }
    // VELAS MAINNET
    case '0x6a': {
      switch (lockTokenAddress) {
        case '0xe2fe530c047f2d85298b07d9333c05737f1435fb':
          return false
        default:
          return false
      }
    }
    // VELAS TESTNET
    case '0x6f': {
      switch (lockTokenAddress) {
        case '0xc79b22cf9bde5b6441ae1ad713aec0aa8cf9e19d':
          return false
        default:
          return false
      }
    }
    // FANTOM MAINNET
    case '0xfa': {
      switch (lockTokenAddress) {
        case '0xCCEBbE9e2b8f46C2C6862238e60a396AF790B63e':
          return false
        default:
          return false
      }
    }
    // FANTOM TESTNET
    case '0xfa2': {
      switch (lockTokenAddress) {
        case '0xc79b22cf9bde5b6441ae1ad713aec0aa8cf9e19d':
          return false
        default:
          return false
      }
    }
    // ETC MAINNET
    case '0x3d': {
      switch (lockTokenAddress) {
        case '0x586c21a779c24efd2a8af33c9f7df2a2ea9af55c':
          return true
        default:
          return false
      }
    }
    // ETC TESTNET
    case '0x3f': {
      switch (lockTokenAddress) {
        case '0x2ea28a07b82701b76de450c67aa7a4259bc4c75e':
          return false
        default:
          return false
      }
    }
    // KAVA MAINNET
    case '0x8ae': {
      switch (lockTokenAddress) {
        case '0xa9ec655dac35d989c0c8be075b1106dcd32502d6':
          return false
        default:
          return false
      }
    }
    // KAVA TESTNET
    case '0x8ad': {
      switch (lockTokenAddress) {
        case '0xd883fbb2db56a837d671f9a50ab10ab683ce1770':
          return false
        default:
          return false
      }
    }
    // PULSECHAIN MAINNET
    case '0x171': {
      switch (lockTokenAddress) {
        case '0xe2fe530c047f2d85298b07d9333c05737f1435fb':
          return true
        default:
          return false
      }
    }
    // ARBITRUM MAINNET
    case '0xa4b1': {
      switch (lockTokenAddress) {
        case '0xe0b0d2021293bee9715e1db3be31b55c00f72a75':
          return true
        default:
          return false
      }
    }
    // ARBITRUM TESTNET
    case '0x66eed': {
      switch (lockTokenAddress) {
        case '0x6fd300cd12f30e1cbe4fd7baf9df7874a18531bb':
          return true
        default:
          return false
      }
    }
    // BASE MAINNET // basechaindev
    case '0x2105': {
      switch (lockTokenAddress) {
        case '0x4f0fd563be89ec8c3e7d595bf3639128c0a7c33a': // BASE_UPDATE_CONTRACT
          return true
        default:
          return false
      }
    }
    // BASE ZKSNYC MAINNET
    case '0x144': {
      switch (lockTokenAddress) {
        case '0xE6fcefa80C6eEc28b2682EbB6b4b476E7F2b9Bdf': // BASE_UPDATE_CONTRACT
          return true
        default:
          return false
      }
    }

    default:
      return false
  }
}

export const whitelistingSupportedLockContract = (
  chainId: string,
  lockTokenAddress: string
) => {
  switch (chainId) {
    // ETH MAINNET
    case '0x1': {
      switch (lockTokenAddress) {
        case '0xe2fe530c047f2d85298b07d9333c05737f1435fb':
          return true
        default:
          return false
      }
    }
    // GOERLI TESTNET
    case '0x5': {
      switch (lockTokenAddress) {
        case '0x256c6f9823c9107900a0f35d041247882cb88efd':
          return true
        default:
          return false
      }
    }
    // SEPOLIA TESTNET
    case '0xaa36a7': {
      switch (lockTokenAddress) {
        case '0x4f0fd563be89ec8c3e7d595bf3639128c0a7c33a':
          return true
        default:
          return false
      }
    }
    // BSC MAINNET
    case '0x38': {
      switch (lockTokenAddress) {
        case '0x0c89c0407775dd89b12918b9c0aa42bf96518820':
          return true
        default:
          return false
      }
    }
    // BSC TESTNET
    case '0x61': {
      switch (lockTokenAddress) {
        case '0xdf68ad003175883c97c10f37681613dc6a9b278a':
          return true
        case '0x8e89f184a549dc8f56728e4787b6157af77ec35e':
          return true
        default:
          return false
      }
    }
    // AVAX MAINNET
    case '0xa86a': {
      switch (lockTokenAddress) {
        case '0xe2fe530c047f2d85298b07d9333c05737f1435fb':
          return false
        default:
          return false
      }
    }
    // AVAX TESTNET
    case '0xa869': {
      switch (lockTokenAddress) {
        case '0xc79b22cf9bde5b6441ae1ad713aec0aa8cf9e19d':
          return false
        default:
          return false
      }
    }
    // CONFLUX MAINNET
    case '0xmain': {
      switch (lockTokenAddress) {
        default:
          return false
      }
    }
    // CONFLUX TESTNET
    case '0xtest': {
      switch (lockTokenAddress) {
        default:
          return false
      }
    }
    // POLYGON MAINNET
    case '0x89': {
      switch (lockTokenAddress) {
        case '0x3ef7442df454ba6b7c1deec8ddf29cfb2d6e56c7':
          return true
        default:
          return false
      }
    }
    // MUMBAI(POLYGON) TESTNET
    case '0x13881': {
      switch (lockTokenAddress) {
        case '0x0891b3728ba802e5240ae3552749eb23093ed2d5':
          return false
        default:
          return false
      }
    }
    // PULSECHAIN TESTNET
    case '0x3ad': {
      switch (lockTokenAddress) {
        case '0x9f726019452d65a120e1f7ae6b937ee9ebd72440':
          return false
        default:
          return false
      }
    }
    // CRONOS TESTNET
    case '0x152': {
      switch (lockTokenAddress) {
        case '0xc79b22cf9bde5b6441ae1ad713aec0aa8cf9e19d':
          return false
        default:
          return false
      }
    }
    // CRONOS MAINNET
    case '0x19': {
      switch (lockTokenAddress) {
        case '0x4f0fd563be89ec8c3e7d595bf3639128c0a7c33a':
          return true
        default:
          return false
      }
    }
    // HECO MAINNET
    case '0x80': {
      switch (lockTokenAddress) {
        case '0xe2fe530c047f2d85298b07d9333c05737f1435fb':
          return true
        default:
          return false
      }
    }
    // HECO TESTNET
    case '0x100': {
      switch (lockTokenAddress) {
        case '0xc79b22cf9bde5b6441ae1ad713aec0aa8cf9e19d':
          return false
        default:
          return false
      }
    }
    // VELAS MAINNET
    case '0x6a': {
      switch (lockTokenAddress) {
        case '0xe2fe530c047f2d85298b07d9333c05737f1435fb':
          return false
        default:
          return false
      }
    }
    // VELAS TESTNET
    case '0x6f': {
      switch (lockTokenAddress) {
        case '0xc79b22cf9bde5b6441ae1ad713aec0aa8cf9e19d':
          return false
        default:
          return false
      }
    }
    // FANTOM MAINNET
    case '0xfa': {
      switch (lockTokenAddress) {
        case '0xCCEBbE9e2b8f46C2C6862238e60a396AF790B63e':
          return false
        default:
          return false
      }
    }
    // FANTOM TESTNET
    case '0xfa2': {
      switch (lockTokenAddress) {
        case '0xc79b22cf9bde5b6441ae1ad713aec0aa8cf9e19d':
          return false
        default:
          return false
      }
    }
    // ETC MAINNET
    case '0x3d': {
      switch (lockTokenAddress) {
        case '0x586c21a779c24efd2a8af33c9f7df2a2ea9af55c':
          return true
        default:
          return false
      }
    }
    // ETC TESTNET
    case '0x3f': {
      switch (lockTokenAddress) {
        case '0x2ea28a07b82701b76de450c67aa7a4259bc4c75e':
          return false
        default:
          return false
      }
    }
    // KAVA MAINNET
    case '0x8ae': {
      switch (lockTokenAddress) {
        case '0xa9ec655dac35d989c0c8be075b1106dcd32502d6':
          return false
        default:
          return false
      }
    }
    // KAVA TESTNET
    case '0x8ad': {
      switch (lockTokenAddress) {
        case '0xd883fbb2db56a837d671f9a50ab10ab683ce1770':
          return false
        default:
          return false
      }
    }
    // PULSECHAIN MAINNET
    case '0x171': {
      switch (lockTokenAddress) {
        case '0xe2fe530c047f2d85298b07d9333c05737f1435fb':
          return false
        default:
          return false
      }
    }
    // ARBITRUM MAINNET
    case '0xa4b1': {
      switch (lockTokenAddress) {
        case '0xe0b0d2021293bee9715e1db3be31b55c00f72a75':
          return true
        default:
          return false
      }
    }
    // ARBITRUM TESTNET
    case '0x66eed': {
      switch (lockTokenAddress) {
        case '0x6fd300cd12f30e1cbe4fd7baf9df7874a18531bb':
          return true
        default:
          return false
      }
    }
    // BASE MAINNET // basechaindev
    case '0x2105': {
      switch (lockTokenAddress) {
        case '0x4f0fd563be89ec8c3e7d595bf3639128c0a7c33a': // BASE_UPDATE_CONTRACT
          return true
        default:
          return false
      }
    }

    default:
      return false
  }
}

export const blockchainByChainId = (chainId: string) => {
  if (isBSC(chainId)) {
    return 'Binance Smart Chain'
  }
  if (isAVAX(chainId)) {
    return 'Avalanche'
  }
  if (isALGO(chainId)) {
    return 'Algorand'
  }
  if (isMATIC(chainId)) {
    return 'Polygon'
  }
  if (isPULSE(chainId)) {
    return 'PulseChain'
  }
  if (isCronos(chainId)) {
    return 'Cronos'
  }
  if (isHeco(chainId)) {
    return 'Heco'
  }
  if (isVelas(chainId)) {
    return 'Velas'
  }
  if (isFantom(chainId)) {
    return 'Fantom'
  }
  if (isETC(chainId)) {
    return 'Ethereum Classic'
  }
  if (isKava(chainId)) {
    return 'Kava'
  }
  if (isArbitrum(chainId)) {
    return 'Arbitrum'
  }
  if (isBase(chainId)) {
    // basechaindev
    return 'Base'
  }
  if (iszkSync(chainId)) {
    return 'zkSync'
  }
  return 'Ethereum'
}

export const blockchainByChainIdDataLayerEvents = (chainId: string) => {
  if (chainId === '0x61') {
    return 'chain-Binance-Smart-Chain-testnet'
  }
  if (chainId === '0x5') {
    return 'chain-Ethereum-Goerli'
  }
  if (chainId === '0xaa36a7') {
    return 'chain-Ethereum-Sepolia'
  }
  if (chainId === '0x8ad') {
    return 'chain-Kava-testnet'
  }
  if (chainId === '0x66eed') {
    return 'chain-Arbitrum-testnet'
  }
  if (isBSC(chainId)) {
    return 'chain-Binance-Smart-Chain'
  }
  if (isAVAX(chainId)) {
    return 'chain-Avalanche'
  }
  if (isALGO(chainId)) {
    return 'chain-Algorand'
  }
  if (isMATIC(chainId)) {
    return 'chain-Polygon'
  }
  if (isPULSE(chainId)) {
    return 'chain-PulseChain'
  }
  if (isCronos(chainId)) {
    return 'chain-Cronos'
  }
  if (isHeco(chainId)) {
    return 'chain-Heco'
  }
  if (isVelas(chainId)) {
    return 'chain-Velas'
  }
  if (isFantom(chainId)) {
    return 'chain-Fantom'
  }
  if (isKava(chainId)) {
    return 'chain-Kava'
  }
  if (isETC(chainId)) {
    return 'chain-Ethereum-Classic'
  }
  if (isArbitrum(chainId)) {
    return 'chain-Arbitrum'
  }
  if (isBase(chainId)) {
    // basechaindev
    return 'chain-Base'
  }
  if (iszkSync(chainId)) {
    return 'chain-zkSync'
  }

  return 'chain-Ethereum'
}

export const getTokenIdParams = (tokenId: string) => {
  if (
    tokenId !== null &&
    tokenId !== '0' &&
    tokenId !== undefined &&
    tokenId !== ''
  ) {
    return `/${tokenId}`
  }
  return ''
}

export const isLiquidityTokenSymbol = (symbol: string) => {
  if (symbol === 'UNI-V2' || symbol === 'Cake-LP') {
    return true
  }
  return false
}

export const getChainProperty = (
  chains: Array<any>,
  chainId: string,
  prop: string
) => {
  const found = chains.find((chain) => chain.chainIds.includes(chainId))
  if (!found) {
    return ''
  }
  return found[prop]
}

export const getNetworkByChainId = (chainId = '0x1') => {
  const chainIdToNetwork: Record<string, string> = {
    '0x1': 'ethereum',
    '0x3': 'ethereum',
    '0x5': 'ethereum',
    '0xaa36a7': 'ethereum',
    '0x38': 'bsc',
    '0x61': 'bsc',
    '0xa86a': 'avax',
    '0xa869': 'avax',
    '0xmain': 'algorand',
    '0xtest': 'algorand',
    '0x89': 'polygon',
    '0x13881': 'polygon',
    '0x3ad': 'pulsechain',
    '0x171': 'pulsechain',
    '0x152': 'cronos',
    '0x19': 'cronos',
    '0x100': 'heco',
    '0x80': 'heco',
    '0x6a': 'velas,',
    '0x6f': 'velas',
    '0xfa': 'fantom',
    '0xfa2': 'fantom',
    '0x3d': 'etc',
    '0x3f': 'etc',
    '0x8ae': 'kava',
    '0x8ad': 'kava',
    '0xa4b1': 'arbitrum',
    '0x66eed': 'arbitrum',
    '0x2105': 'base', // basechaindev
    '0x144': 'zkSync',
  }
  return chainIdToNetwork[chainId]
}

export function removeDuplicateAdminVestings(data: any) {
  const uniques: Array<any> = []
  data.forEach((value: any) => {
    const pos = uniques.findIndex(
      (a) =>
        a.balanceMap.address.toLowerCase() ===
          value.balanceMap.address.toLowerCase() &&
        a.balanceMap.merkleRoot.toLowerCase() ===
          value.balanceMap.merkleRoot.toLowerCase() &&
        a.transactionHash.toLowerCase() === value.transactionHash.toLowerCase()
    )
    if (pos === -1) {
      uniques.push(value)
    }
  })
  return uniques
}

export function secondsToCadence(seconds: number) {
  let cadence = 'Undefined'
  switch (seconds) {
    case 1:
      cadence = 'Per second'
      break
    case 60:
      cadence = 'Per minute'
      break
    case 3600:
      cadence = 'Per hour'
      break
    case 86400:
      cadence = 'Per day'
      break
    case 604800:
      cadence = 'Per week'
      break
    case 2592000:
      cadence = 'Per month'
      break
    case 7776000:
      cadence = 'Quarterly'
      break
    case 31104000:
      cadence = 'Annually'
      break
    default:
      break
  }

  return cadence
}

export function subgraphSupportedVesting(chainId: string) {
  switch (chainId) {
    case '0x1': // ETH
      return true
    case '0x38': // BSC
      return true
    case '0xfa': // FANTIM
      return true
    case '0xa86a': // AVAX
      return true
    case '0x5': // GOERLI
      return true
    case '0x89': // POLYGON
      return true
    default:
      return false
  }
}

export function truncateString(inputStr?: string, targetLength?: number) {
  const DEFAULT_LENGTH = 16
  if (!inputStr) {
    return ''
  }

  const l = targetLength ?? DEFAULT_LENGTH
  if (inputStr.length > l) {
    return `${inputStr.substr(0, l - 1)}...`
  }
  return inputStr
}

export function getRegex(type?: 'email' | 'phone') {
  if (type === 'email') {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  }
  return /start[\s\S]*end/
}

export function centerEllipsizeString(input?: string | null, numberChars = 4) {
  if (!input) return ''
  if (input.length < 10) return input
  return `${input.substring(0, numberChars + 2)}...${input.slice(
    0 - numberChars
  )}`
}

export function convertFileSize(size: number) {
  return numbro(size).format({
    output: 'byte',
    base: 'binary',
    mantissa: 2,
    spaceSeparated: true,
  })
}

export function moralisAPISupportedChains(chainId: string) {
  switch (chainId) {
    case '0x1': // ETH
      return true
    case '0x5': // Goerli ETH
      return true
    case '0xaa36a7': // Sepolia ETH
      return true
    case '0x38': // BSC
      return true
    case '0xfa': // FANTIM
      return true
    case '0xa86a': // AVAX
      return true
    case '0x89': // POLYGON
      return true
    case '0x19': // CRONOS
      return true
    case '0xa4b1': // ARBITRUM
      return true
    default:
      return false
  }
}

// TODO: replace this logic!
// coinChainId
// = 0: Ethereum
// = 1: Bsc
// = 2: Avax
// = 3, ALGO
// = 4, MATIC
// = 5, TPLS
// = 6, CRO
// = 7, HT
export const getCoinChainId = (chainId: string) => {
  if (['0x1', '0x3', '0x4', '0x5', '0xaa36a7'].includes(chainId)) {
    return 0
  }
  if (['0x38', '0x61'].includes(chainId)) {
    return 1
  }
  if (['0xa86a', '0xa869'].includes(chainId)) {
    return 2
  }
  if (['0xmain', '0xtest'].includes(chainId)) {
    return 3
  }
  if (['0x89', '0x13881'].includes(chainId)) {
    return 4
  }
  if (['0x3ac'].includes(chainId)) {
    return 5
  }
  if (['0x152', '0x19'].includes(chainId)) {
    return 6
  }
  if (['0x100', '0x80'].includes(chainId)) {
    return 7
  }
  if (['0x6a', '0x6f'].includes(chainId)) {
    return 8
  }
  if (['0xfa', '0xfa2'].includes(chainId)) {
    return 9
  }
  if (['0x8ae', '0x8ad'].includes(chainId)) {
    return 10
  }
  if (['0x171'].includes(chainId)) {
    return 11
  }
  if (['0x2105'].includes(chainId)) {
    return 12 // basechaindev
  }
  if (['0x144'].includes(chainId)) {
    return 13
  }
  if (isArbitrum(chainId)) {
    return 14
  }
  return 0
}

export function getTimeZoneOffset(): string {
  try {
    const tempDate = new Date()
    const offset = tempDate.getTimezoneOffset()
    if (offset < 0) {
      return `+${-offset / 60}`
    }
    if (offset > 0) {
      return `-${offset / 60}`
    }
    return '+0'
  } catch (error) {
    console.error(error)
    return '+0'
  }
}
