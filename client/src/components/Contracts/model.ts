export type Web3Ethers = {
    chainId?: number
    account?: string
    activateBrowserWallet: () => void
    deactivate: () => void
    isLoading: boolean
}