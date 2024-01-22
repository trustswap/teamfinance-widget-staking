import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { chains } from '../data'

export interface UsedFeatures {
  vesting: boolean
  liquidityLock: boolean
  teamTokenLockLock: boolean
  nftLock: boolean
  tokenCreation: boolean
}

interface AppContextProps {
  chain: Record<string, any>
  setChain: (chain: Record<string, any>) => void
  openUnsupportedChain: boolean
  showSurveyAlert: boolean
  setShowSurveyAlert: (val: boolean) => void
  setOpenUnsupportedChain: (openUnsupportedChain: boolean) => void
  usedFeatures: UsedFeatures
  setUsedFeatures: (features: UsedFeatures) => void
}

const defaultValues: AppContextProps = {
  chain: chains[0],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setChain: (chain) => null,
  openUnsupportedChain: false,
  showSurveyAlert: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setShowSurveyAlert: (val) => null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setOpenUnsupportedChain: (openUnsupportedChain) => null,
  usedFeatures: {
    vesting: false,
    liquidityLock: false,
    teamTokenLockLock: false,
    nftLock: false,
    tokenCreation: false,
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setUsedFeatures: (features: UsedFeatures) => null,
}

const AppContext = createContext<AppContextProps>(defaultValues)

export function useAppContext() {
  return useContext(AppContext)
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeChain, setActiveChain] = useState(chains[0])
  const [isOpenUnsupportedChain, setIsOpenUnsupportedChain] = useState(false)
  const [activeFeatures, setActiveFeatures] = useState(
    defaultValues.usedFeatures
  )

  const [showSurveyAlert, setShowSurveyAlert] = useState(false)

  const select = (chain: SetStateAction<any>) => {
    setActiveChain(chain)
  }

  const selectUnsupportedChain = (isOpenUnsupportedModal: boolean) => {
    setIsOpenUnsupportedChain(isOpenUnsupportedModal)
  }

  const activateFeatures = useCallback((features: SetStateAction<any>) => {
    setActiveFeatures(features)
  }, [])

  const value = useMemo(
    () => ({
      chain: activeChain,
      setChain: select,
      openUnsupportedChain: isOpenUnsupportedChain,
      setOpenUnsupportedChain: selectUnsupportedChain,
      usedFeatures: activeFeatures,
      setUsedFeatures: activateFeatures,
      showSurveyAlert,
      setShowSurveyAlert,
    }),
    [
      activateFeatures,
      activeChain,
      activeFeatures,
      isOpenUnsupportedChain,
      showSurveyAlert,
    ]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
