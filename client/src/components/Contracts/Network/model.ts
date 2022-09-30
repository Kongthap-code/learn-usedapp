import { providers } from "ethers"

export interface Network {
    chainId?: number,
    accounts: string[]
}

export interface UpdateNetwork {
    type: 'UPDATE_NETWORK'
    network: Partial<Network>
}

export const defaultNetworkState = {
    chainId: undefined,
    accounts: [],
}