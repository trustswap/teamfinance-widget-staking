/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
// import Image, { ImageProps } from 'next/image';

const defaultTokenLogo = (chainId: string | undefined) => {
  if (
    chainId === '0x1' ||
    chainId === '0x3' ||
    chainId === '0x4' ||
    chainId === '0x5' ||
    chainId === '0xaa36a7'
  ) {
    return '/tokens/ethereum-token.webp'
  }
  if (chainId === '0x38' || chainId === '0x61') {
    return '/tokens/bsc-token.webp'
  }
  if (chainId === '0xa86a' || chainId === '0xa869') {
    return '/tokens/avalanche-token.png'
  }
  if (chainId === '0x89' || chainId === '0x13881') {
    return '/tokens/polygon-token.webp'
    // velas
  }
  if (chainId === '0x6a' || chainId === '0x6f') {
    return '/tokens/velas-token.png'
    // chronos
  }
  if (chainId === '0x152' || chainId === '0x19') {
    return '/tokens/chronos-token.png'
    // heco
  }
  if (chainId === '0x100' || chainId === '0x80') {
    return '/tokens/heco-token.png'
  }
  if (chainId === '0x171') {
    return '/tokens/blockchain-pulsechain.svg'
  }
  if (chainId === '0x66eed' || chainId === '0xa4b1') {
    return '/tokens/arbitrum-token.png'
    // arbitrum
  }
  return '/tokens/ethereum-token.webp'
}

export interface TokenImageProps extends React.ComponentProps<'img'> {
  /**
   Append custom attributes
   */
  className?: string
  /**
   Src of the TokenImage
   */
  src: string
  /**
   Alt of the TokenImage
   */
  alt?: string
  /**
   ChainId of the TokenImage
   */
  chainId?: string
}

export function TokenImage({ className, src, alt, chainId }: TokenImageProps) {
  const [imgSrc, setImgSrc] = useState(src?.replace(/^http:\/\//i, 'https://'))

  useEffect(() => {
    setImgSrc(src?.replace(/^http:\/\//i, 'https://'))
  }, [src])

  return (
    <img
      className={className}
      alt={alt}
      src={imgSrc || defaultTokenLogo(chainId)}
      onError={() => setImgSrc(defaultTokenLogo(chainId))}
    />
  )
}

TokenImage.defaultProps = {
  className: '',
  alt: 'tokenLogo',
  chainId: '0x1',
}
