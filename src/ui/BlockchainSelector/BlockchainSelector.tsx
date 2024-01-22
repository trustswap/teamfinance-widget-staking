// Includes a modal and a button on the header.
import classNames from 'classnames'
import { Fragment, useState } from 'react'
import { BiLinkExternal } from 'react-icons/bi'

import { chains } from '../../utils/data'
import { Button } from '../Button'
import { Modal } from '../Modal'
import { Tooltip } from '../Tooltip'
import { Typography } from '../Typography'

interface Props {
  nonEvmChainIconPath: string
}

const TF_LINK = 'https://www.team.finance/'

function BlockchainSelector({ nonEvmChainIconPath }: Props) {
  const [chainSelectorModalOpen, setChainSelectorModalOpen] = useState(false)

  function onChoose(item: chains.ChainType) {
    const isDifferentChain = item.icon !== nonEvmChainIconPath
    const isInConflux =
      item.name === 'Conflux Testnet' && nonEvmChainIconPath.includes('conflux')

    setChainSelectorModalOpen(false)
    // Small hack for Conflux Testnet
    if (isInConflux) {
      return
    }
    if (isDifferentChain) {
      if (item.redirectUrl) {
        window?.open(item.redirectUrl, '_blank')
      } else {
        window?.open(TF_LINK, '_blank')
      }
    }
  }

  function shouldShowExternalLink(item: chains.ChainType) {
    const isDifferentChain = item.icon !== nonEvmChainIconPath
    const isInConflux =
      item.name === 'Conflux Testnet' && nonEvmChainIconPath.includes('conflux')

    if (isInConflux) {
      return false
    }
    if (isDifferentChain) {
      return true
    }
    return false
  }

  return (
    <>
      <button
        className="aspect-1 h-11 rounded-md border border-gray-300 p-2 hover:bg-slate-100"
        type="button"
        onClick={() => setChainSelectorModalOpen(true)}
      >
        <img alt="Chain Icon" className="h-full" src={nonEvmChainIconPath} />
      </button>
      <Modal
        title="Select network"
        open={chainSelectorModalOpen}
        setOpen={setChainSelectorModalOpen}
      >
        <main className="max-h-[calc(100vh-6rem)] space-y-3 overflow-y-auto">
          <Typography variant="title-4">Mainnets</Typography>
          <div className="grid gap-2 sm:grid-cols-2">
            {chains.mainnetsChains.map((item) => {
              const isDifferentChain = item.icon !== nonEvmChainIconPath

              return (
                <Fragment key={item.chainId}>
                  <Button
                    className={classNames('border-0', {
                      '!bg-gray-50': shouldShowExternalLink(item),
                      '!bg-blue-50': !shouldShowExternalLink(item),
                    })}
                    data-tooltip-id={item.chainId}
                    align="grow"
                    variant="secondary"
                    onClick={() => onChoose(item)}
                    disabled={!shouldShowExternalLink(item)}
                    icon={
                      shouldShowExternalLink(item) ? (
                        <BiLinkExternal className="text-black-65 h-5 w-5" />
                      ) : null
                    }
                  >
                    <div className="flex items-center space-x-2.5 text-black">
                      <img
                        className="h-5 w-5"
                        src={item.icon}
                        width={24}
                        height={24}
                        alt={`${item.name} Icon`}
                      />
                      <Typography variant="body">{item.name}</Typography>
                    </div>
                  </Button>
                  {isDifferentChain && (
                    <Tooltip id={item.chainId}>
                      <p className="text-sm text-white">
                        You will be redirected to a subdomain for this
                        blockchain. Don&apos;t worry, you&apos;re still safe
                        with us!
                      </p>
                    </Tooltip>
                  )}
                </Fragment>
              )
            })}
          </div>
          <Typography variant="title-4">Testnets</Typography>
          <div className="grid gap-2 sm:grid-cols-2">
            {chains.testnetsChains.map((item) => {
              const isDifferentChain = item.icon !== nonEvmChainIconPath
              return (
                <Fragment key={item.chainId}>
                  <Button
                    className={classNames('border-0', {
                      '!bg-gray-50': shouldShowExternalLink(item),
                      '!bg-blue-50': !shouldShowExternalLink(item),
                    })}
                    data-tooltip-id={item.chainId}
                    align="grow"
                    variant="secondary"
                    onClick={() => onChoose(item)}
                    disabled={!shouldShowExternalLink(item)}
                    icon={
                      shouldShowExternalLink(item) ? (
                        <BiLinkExternal className="text-black-65 h-5 w-5" />
                      ) : null
                    }
                  >
                    <div className="flex items-center space-x-2.5 text-black">
                      <img
                        className="h-5 w-5"
                        src={item.icon}
                        width={24}
                        height={24}
                        alt="Icon"
                      />
                      <Typography variant="body">{item.name}</Typography>
                    </div>
                  </Button>
                  {isDifferentChain && (
                    <Tooltip id={item.chainId}>
                      <p className="text-sm text-white">
                        You will be redirected to a subdomain for this
                        blockchain. Don&apos;t worry, you&apos;re still safe
                        with us!
                      </p>
                    </Tooltip>
                  )}
                </Fragment>
              )
            })}
          </div>
        </main>
      </Modal>
    </>
  )
}

export default BlockchainSelector
