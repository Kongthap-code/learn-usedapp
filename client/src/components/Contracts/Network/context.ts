import { createContext, useContext } from 'react'
import { Network } from './model'

export const NetworkContext = createContext<{
  network: Network
  activateBrowserWallet: () => void
  deactivate: () => void
  isLoading: boolean
}>({
  network: {
    chainId: 11155111,
    accounts: [],
  },
  activateBrowserWallet: () => undefined,
  deactivate: () => undefined,
  isLoading: true,
})

export function useNetwork() {
  return useContext(NetworkContext)
}
