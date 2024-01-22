import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { BiQrScan, BiRightArrowAlt } from 'react-icons/bi'
import { useAccount, useConnect } from 'wagmi'

import { Button, Modal, Typography } from '../../ui'
import { walletInfo } from '../../utils'

interface ModalWalletsProps {
  open: boolean
  setOpen: (open: boolean) => void
  title: string
}

export default function ModalWallets({
  open,
  setOpen,
  title,
}: ModalWalletsProps) {
  const [walletOptions, setWalletOptions] = useState(walletInfo)
  const { connect, connectors } = useConnect()
  const { connector: activeConnector } = useAccount()

  const tryConnect = async (type: string) => {
    const selectedConnector = connectors.find(
      (c) => c.name.toLowerCase() === type.toLowerCase()
    )
    if (selectedConnector.name === activeConnector?.name) {
      console.log('already connected')
      return
    }
    try {
      await connect({ connector: selectedConnector })
    } catch (ex) {
      console.log('wallet connect error', ex)
    }
  }

  useEffect(() => {
    try {
      if (window.ethereum) {
        if (!window.ethereum.isMetaMask) {
          const newWalletOptions = walletInfo.filter(
            (item) => item.title !== 'MetaMask'
          )
          setWalletOptions(newWalletOptions)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <Modal
      title={title}
      open={open}
      setOpen={setOpen}
      className="w-full max-w-[480px]"
    >
      <main className="flex flex-col gap-2" data-testid="select-wallet-modal">
        {walletOptions.map((item) => (
          <Button
            align="grow"
            key={item.connectionType}
            className="!text-black"
            variant="secondary"
            icon={
              item.walletType.includes('qr-code') ? (
                <BiQrScan className="h-4 w-5" />
              ) : (
                <BiRightArrowAlt className="h-5 w-5" />
              )
            }
            onClick={() => {
              tryConnect(item.connectionType)
              setOpen(false)
            }}
          >
            <div className="flex items-center gap-3 pr-10">
              <Image
                src={item.image}
                width={50}
                height={50}
                className="h-6 w-6 object-contain"
                alt={item.title}
              />
              <Typography variant="button">{item.title}</Typography>
            </div>
          </Button>
        ))}
      </main>
    </Modal>
  )
}
