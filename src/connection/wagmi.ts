import { Chain, configureChains, createClient } from 'wagmi'
import {
  arbitrum,
  arbitrumGoerli,
  avalanche,
  bsc,
  bscTestnet,
  fantom,
  goerli,
  // mainnet,
  polygon,
  sepolia,
} from 'wagmi/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
/* import { LedgerConnector } from 'wagmi/connectors/ledger' */
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { SafeConnector } from 'wagmi/connectors/safe'
/* import { WalletConnectConnector } from 'wagmi/connectors/walletConnect' */
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'

import {
  baseMainnet,
  cronos,
  etc,
  etcTestnet,
  heco,
  kava,
  kavaTestnet,
  pulseChain,
  velas,
  zkSyncMainnet,
} from './customChains'

const mainnetConfig: Chain = {
  id: 1,
  network: 'homestead',
  name: 'Ethereum',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    alchemy: {
      http: ['https://eth-mainnet.g.alchemy.com/v2'],
      webSocket: ['wss://eth-mainnet.g.alchemy.com/v2'],
    },
    infura: {
      http: ['https://mainnet.infura.io/v3'],
      webSocket: ['wss://mainnet.infura.io/ws/v3'],
    },
    default: {
      http: ['https://rpc.ankr.com/eth'],
    },
    public: {
      http: ['https://rpc.ankr.com/eth'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'Etherscan',
      url: 'https://etherscan.io',
    },
    default: {
      name: 'Etherscan',
      url: 'https://etherscan.io',
    },
  },
  contracts: {
    ensRegistry: {
      address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    },
    ensUniversalResolver: {
      address: '0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da',
      blockCreated: 16773775,
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 14353601,
    },
  },
}

const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnetConfig,
    arbitrum,
    arbitrumGoerli,
    avalanche,
    bsc,
    bscTestnet,
    fantom,
    goerli,
    polygon,
    sepolia,
    cronos,
    etc,
    etcTestnet,
    heco,
    kava,
    kavaTestnet,
    pulseChain,
    velas,
    baseMainnet,
    zkSyncMainnet,
  ],
  [
    publicProvider(),
    jsonRpcProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ]
)
// eslint-disable-next-line import/prefer-default-export
export const wagmiClient: any = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'Team Finance',
      },
    }),
    /*
    new WalletConnectConnector({
      chains,
      options: {
        showQrModal: true,
        projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_KEY,
      },
    }),
    */
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
    new SafeConnector({
      chains,
      options: {
        allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
        debug: false,
      },
    }),
    /* new LedgerConnector(), */
  ],
  provider,
  webSocketProvider,
})
