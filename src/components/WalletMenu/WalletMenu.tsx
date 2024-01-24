import { Menu, Transition } from '@headlessui/react'
import classNames from 'classnames'
import Image from 'next/image'
import React, { Fragment, useEffect, useState } from 'react'
import {
  BiCheck,
  BiChevronDown,
  BiChevronRight,
  BiLinkExternal,
} from 'react-icons/bi'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { Tooltip } from 'react-tooltip'
import { useWindowSize } from 'usehooks-ts'
import {
  useAccount,
  useDisconnect,
  useEnsName,
  useNetwork,
  useSwitchNetwork,
} from 'wagmi'

import {
  mainnetsChains,
  supportedChainIds,
  testnetsChains,
} from '../../connection'
import { useAppContext } from '../../context/AppContext'
import { Button, Modal, Typography } from '../../ui'
import { toHex, walletInfo } from '../../utils'
import { redirectIfNecessary } from '../../utils/switchNetwork'
import ModalWallets from './ModalWallets'

export default function WalletMenu() {
  const { chain } = useNetwork()
  const [currentChain, setCurrentChain] = useState(mainnetsChains[0])
  const { openUnsupportedChain, setOpenUnsupportedChain } =
    useAppContext()
  const [chainSelectorModalOpen, setChainSelectorModalOpen] = useState(false)
  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const [walletImage, setWalletImage] = useState('')

  const { address, connector } = useAccount()
  const { switchNetwork } = useSwitchNetwork()
  const { disconnect } = useDisconnect()
  const { data: ensData } = useEnsName({ address, chainId: 1 })
  const [readableAddress, setReadableAddress] = useState('')

  const { width } = useWindowSize()

  const menuItems = [{ name: 'Disconnect', onClick: () => disconnect() }]

  const switchNetworkAfterUnsupported = async (networkChainId: string) => {
    const provider = await connector?.getProvider()
    if (provider) {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: networkChainId }],
      })
    }
  }

  useEffect(() => {
    try {
      if (chain?.id) {
        setOpenUnsupportedChain(!supportedChainIds.includes(chain.id))
      }
    } catch (error) {
      console.error(error)
    }
  }, [chain, setOpenUnsupportedChain])

  useEffect(() => {
    if (chain) {
      const mainnet = mainnetsChains.find((x) => x.chainId === toHex(chain.id))
      if (mainnet) {
        setCurrentChain(mainnet)
      }

      const testnet = testnetsChains.find((x) => x.chainId === toHex(chain.id))
      if (testnet) {
        setCurrentChain(testnet)
      }
    } else if (!address) {
      setCurrentChain(mainnetsChains[0])
    }
  }, [address, chain])

  useEffect(() => {
    const renderAddress = () => {
      if (ensData) {
        setReadableAddress(ensData)
        return
      }
      if (address) {
        setReadableAddress(
          `${address?.substring(0, 6)}...${address?.substring(
            address.length - 4,
            address.length
          )}`
        )
        return
      }
      setReadableAddress('')
    }

    renderAddress()
  }, [ensData, address])

  useEffect(() => {
    try {
      if (!connector?.name) {
        setWalletImage('')
        return
      }
      setWalletImage(
        walletInfo.filter((wallet) => wallet.title === connector.name)[0].image
      )
    } catch (error) {
      console.error(error)
    }
  }, [connector?.name])

  return (
    <>
      <div className="flex items-center">
        <button
          type="button"
          className="-mr-px flex h-9 w-9 items-center justify-center rounded-l-md border bg-white hover:bg-gray-100 focus:outline-none"
          onClick={() => setChainSelectorModalOpen(true)}
        >
          <Image
            src={currentChain.icon}
            className="h-5 w-5"
            width={20}
            height={20}
            alt="Icon"
          />
        </button>
        <Menu as="div" className="">
          {({ open }) => (
            <>
              <div className="flex items-center text-sm">
                {readableAddress ? (
                  <Menu.Button
                    className={classNames(
                      open ? 'bg-gray-100' : 'bg-white',
                      'flex h-9 items-center gap-1 rounded-r-md border px-3 py-1.5 hover:bg-gray-100 focus:outline-none'
                    )}
                  >
                    {width > 768
                      ? readableAddress
                      : walletImage && (
                          <Image
                            src={walletImage}
                            className="h-4 w-4"
                            width={50}
                            height={50}
                            alt="Wallet Icon"
                          />
                        )}
                    <BiChevronDown className="h-4 w-4 flex-shrink-0" />
                  </Menu.Button>
                ) : (
                  <button
                    type="button"
                    className="flex h-9 items-center gap-1 rounded-r-md border bg-white px-3 py-1.5 hover:bg-gray-100 focus:outline-none"
                    onClick={() => setWalletModalOpen(true)}
                    data-testid="connect-wallet-button"
                  >
                    <Typography variant="button-small">
                      Connect Wallet
                    </Typography>
                  </button>
                )}
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-30 mt-2 w-48 origin-top-right rounded-md border bg-white shadow-md focus:outline-none">
                  <div className="flex items-center gap-2 border-b p-3">
                    <Jazzicon
                      diameter={28}
                      seed={address && jsNumberForAddress(address)}
                    />
                    <div className="space-y-0.5">
                      <Typography
                        className="block text-gray-600"
                        variant="caption-1"
                      >
                        {readableAddress}
                      </Typography>
                      <Typography
                        className="block text-gray-500"
                        variant="caption-3"
                      >
                        Connected with {connector?.name}
                      </Typography>
                    </div>
                  </div>
                  <div className="text-gray-700">
                    <div className="py-1">
                      {menuItems.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <button
                              type="button"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block w-full px-3 py-2 text-left text-sm'
                              )}
                              onClick={item.onClick}
                            >
                              {item.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
      <Modal
        title="Select network"
        open={chainSelectorModalOpen}
        setOpen={setChainSelectorModalOpen}
      >
        <main className="max-h-[calc(100vh-6rem)] space-y-3 overflow-y-auto">
          <Typography variant="title-4">Mainnets</Typography>
          <div className="grid gap-2 sm:grid-cols-2">
            {mainnetsChains.map((item) => (
              <Fragment key={item.chainId}>
                <Button
                  className={classNames('border-0', {
                    '!border-blue-lm !border-2':
                      chain?.id === parseInt(item.chainId, 16),
                  })}
                  data-tooltip-id={item.chainId}
                  align="grow"
                  variant="secondary"
                  onClick={async () => {
                    if (item.redirectUrl) {
                      setChainSelectorModalOpen(false)
                      return
                    }
                    if (openUnsupportedChain) {
                      await switchNetworkAfterUnsupported(item.chainId)
                    } else if (!redirectIfNecessary(item.chainId)) {
                      switchNetwork?.(parseInt(item.chainId, 16))
                    }
                    setChainSelectorModalOpen(false)
                  }}
                  icon={
                    <>
                      {chain?.id === parseInt(item.chainId, 16) && (
                        <BiCheck className="text-blue-lm h-5 w-5" />
                      )}
                      {!item.redirectUrl &&
                        chain?.id !== parseInt(item.chainId, 16) && (
                          <BiChevronRight className="text-black-65 h-5 w-5" />
                        )}
                      {item.redirectUrl &&
                        chain?.id !== parseInt(item.chainId, 16) && (
                          <BiLinkExternal className="text-black-65 h-5 w-5" />
                        )}
                    </>
                  }
                  disabled={chain?.id === parseInt(item.chainId, 16)}
                >
                  <div className="flex items-center space-x-2.5 text-black">
                    <Image
                      className="h-5 w-5"
                      src={item.icon}
                      width={24}
                      height={24}
                      alt={`${item.name} Icon`}
                    />
                    <Typography variant="body">{item.name}</Typography>
                  </div>
                </Button>
                {item.redirectUrl && (
                  <Tooltip
                    id={item.chainId}
                    style={{
                      borderRadius: '0.5rem',
                      zIndex: 50,
                      backgroundColor: '#26272B',
                      maxWidth: 200,
                      opacity: 100,
                    }}
                  >
                    <p className="text-sm text-white">
                      You will be redirected to a subdomain for this blockchain.
                      Don&apos;t worry, you&apos;re still safe with us!
                    </p>
                  </Tooltip>
                )}
              </Fragment>
            ))}
          </div>
          <Typography variant="title-4">Testnets</Typography>
          <div className="grid gap-2 sm:grid-cols-2">
            {testnetsChains.map((item) => (
              <Fragment key={item.chainId}>
                <Button
                  className={classNames('border-0', {
                    '!border-blue-lm !border-2':
                      chain?.id === parseInt(item.chainId, 16),
                  })}
                  data-tooltip-id={item.chainId}
                  align="grow"
                  variant="secondary"
                  onClick={async () => {
                    if (item.redirectUrl) {
                      setChainSelectorModalOpen(false)
                      return
                    }
                    if (openUnsupportedChain) {
                      await switchNetworkAfterUnsupported(item.chainId)
                    } else if (!redirectIfNecessary(item.chainId)) {
                      await switchNetwork?.(parseInt(item.chainId, 16))
                    }
                    setChainSelectorModalOpen(false)
                  }}
                  icon={
                    <>
                      {chain?.id === parseInt(item.chainId, 16) && (
                        <BiCheck className="text-blue-lm h-5 w-5" />
                      )}
                      {!item.redirectUrl &&
                        chain?.id !== parseInt(item.chainId, 16) && (
                          <BiChevronRight className="text-black-65 h-5 w-5" />
                        )}
                      {item.redirectUrl &&
                        chain?.id !== parseInt(item.chainId, 16) && (
                          <BiLinkExternal className="text-black-65 h-5 w-5" />
                        )}
                    </>
                  }
                >
                  <div className="flex items-center space-x-2.5 text-black">
                    <Image
                      className="h-5 w-5"
                      src={item.icon}
                      width={24}
                      height={24}
                      alt="Icon"
                    />
                    <Typography variant="body">{item.name}</Typography>
                  </div>
                </Button>
                {item.redirectUrl && (
                  <Tooltip
                    id={item.chainId}
                    style={{
                      borderRadius: '0.5rem',
                      zIndex: 50,
                      backgroundColor: '#26272B',
                      maxWidth: 200,
                      opacity: 100,
                    }}
                  >
                    <p className="text-sm text-white">
                      You will be redirected to a subdomain for this blockchain.
                      Don&apos;t worry, you&apos;re still safe with us!
                    </p>
                  </Tooltip>
                )}
              </Fragment>
            ))}
          </div>
        </main>
      </Modal>
      <ModalWallets
        title="Select wallet"
        open={walletModalOpen}
        setOpen={setWalletModalOpen}
      />
    </>
  )
}
