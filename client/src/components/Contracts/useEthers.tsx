import { NFTLandToken, NFTToken } from "@/contract";
import { Web3Ethers } from "./model";
import { useNetwork } from "./Network/context";


export function useEthers(): Web3Ethers {
    const {
        network: { chainId, accounts },
        activateBrowserWallet,
        deactivate,
        isLoading
    } = useNetwork()

    const account = accounts[0] ? accounts[0] : undefined

    return {
        chainId,
        account,
        activateBrowserWallet,
        deactivate,
        isLoading
    }
}

















