export default interface Token {
  address: string
  logoURI: string
  symbol: string
  decimals: number
  name: string
  chainId: number | string
  balance?: any
}

declare global {
  interface Window {
    dataLayer: any
  }
}
