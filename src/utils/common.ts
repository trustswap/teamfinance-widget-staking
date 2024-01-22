/* eslint-disable no-bitwise */
import { ethers } from 'ethers'

// eslint-disable-next-line import/prefer-default-export
export const getTokenImageUrl = (tokenAddress: string) => {
  if (!tokenAddress) return ''
  if (!ethers.utils.isAddress(tokenAddress)) return ''
  return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${ethers.utils.getAddress(
    tokenAddress
  )}/logo.png`
}

export const addTokenToMetamask = async (
  address: string,
  symbol: string,
  decimals: number,
  imageUrl: string
) => {
  if (window.ethereum) {
    try {
      console.log({
        address, // The address that the token is at.
        symbol, // A ticker symbol or shorthand, up to 5 chars.
        decimals, // The number of decimals in the token
        image: imageUrl, // A string url of the token logo
      })
      await window.ethereum?.request({
        // @ts-ignore
        method: 'wallet_watchAsset',
        params: {
          // @ts-ignore
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address, // The address that the token is at.
            symbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals, // The number of decimals in the token
            image: imageUrl, // A string url of the token logo
          },
        },
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function shortenAddress(address: string, chars = 4) {
  return address
    ? `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`
    : 'Invalid address'
}

export function parseNumber(value: any, locales = navigator.languages) {
  const local = locales[0] ? locales[0] : 'en-US'

  const decimal = Intl.NumberFormat(local)
    .formatToParts(1.1)
    .find((part) => part.type === 'decimal').value

  const example = Intl.NumberFormat(local).format(1.1)
  const cleanPattern = new RegExp(`[^-+0-9${decimal}]`, 'g')
  const cleaned = value.replace(cleanPattern, '')
  const normalized = cleaned.replace(example.charAt(1), '.')

  return parseFloat(normalized)
}

export const generateUUID = () => {
  let d = new Date().getTime()
  const uuid = 'TGENxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x7) | 0x8).toString(16)
  })
  return uuid.toUpperCase()
}
