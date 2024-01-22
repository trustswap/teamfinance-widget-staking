import {
  chainRedirectUrl,
  mainnetsChains,
  supportedChainIds,
  testnetsChains,
} from '../connection'

async function changeNetwork(network: string, provider: any) {
  await (
    await provider
  ).request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: network }],
  })
}

export function redirectIfNecessary(network: string, route?: string): boolean {
  const chainRedirect = chainRedirectUrl.find((x) => x.id === network)
  if (chainRedirect) {
    const win: Window = window
    win.location = route
      ? `${chainRedirect.redirectUrl}/${route}`
      : chainRedirect.redirectUrl
    return true
  }

  return false
}

export default async function switchNetwork(
  network: string,
  connector: any,
  provider: any,
  setShowConnectWalletModal?: any
) {
  console.log(
    'switchnetwork',
    network,
    connector,
    provider,
    setShowConnectWalletModal
  )

  // Redirect for specific chains like Conflux, Algorand, Solana
  let redirected = false
  chainRedirectUrl.forEach((chain) => {
    if (chain.id === network) {
      const win: Window = window
      win.location = chain.redirectUrl
      redirected = true
    }
  })
  if (redirected) return

  if (!connector && setShowConnectWalletModal) {
    setShowConnectWalletModal(true)
    return
  }

  try {
    if (supportedChainIds.includes(parseInt(network, 16))) {
      await changeNetwork(network, provider)
    }
  } catch (switchError: any) {
    console.error('wallet switchNetwork error', switchError)
    // code 4902 for metamask
    // code 32000 for wallet connect
    if (switchError?.code === 4902 || switchError?.code === -32000) {
      let addNetworkParam = {}
      const networkInfo = mainnetsChains
        .concat(testnetsChains)
        .filter((obj) => obj.chainId === network)

      if (networkInfo && networkInfo?.length > 0) {
        addNetworkParam = {
          chainId: networkInfo[0].chainId,
          chainName: networkInfo[0].name,
          rpcUrls: networkInfo[0].rpcUrls,
          nativeCurrency: networkInfo[0].nativeCurrency,
          blockExplorerUrls: networkInfo[0].blockExplorerUrls,
        }
      }
      try {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [addNetworkParam],
        })
      } catch (ex) {
        console.error('Error while adding custom network', ex)
      }
    }
  }
}
