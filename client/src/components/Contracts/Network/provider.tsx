import { NFTLandToken, NFTToken } from "@/contract";
import { useCall } from "@usedapp/core";
import { providers } from "ethers";
import { ReactNode, useCallback, useEffect, useReducer, useState } from "react";
import { NetworkContext } from "./context";
import { defaultNetworkState, Network } from "./model";
import { networkReducer } from "./rediucer";
import { subscribeToProviderEvents } from "./subscribe";
import { useLocalStorage } from "./useLocalStorage";
import detectEthereumProvider from '@metamask/detect-provider'

type ExternalProvider = providers.ExternalProvider
type JsonRpcProvider = providers.JsonRpcProvider
const Web3Provider = providers.Web3Provider
const Provider = providers.Provider

function getWeb3Provider(): JsonRpcProvider {
    const provider = new Web3Provider(window.ethereum)
    return provider
}

async function getAccount(provider: JsonRpcProvider) {
    try {
        return await provider.getSigner().getAddress()
    } catch (err: any) {
        if (err.code === 'UNSUPPORTED_OPERATION') {
            console.error(err)
        }
        throw err
    }
}

interface NetworkProviderProps {
    children: ReactNode
    providerOverride?: JsonRpcProvider
}

export function NetworkProvider({ children, providerOverride }: NetworkProviderProps) {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [onUnsubscribe, setOnUnsubscribe] = useState<() => void>(() => () => undefined)
    const [shouldConnectMetamask, setShouldConnectMetamask] = useLocalStorage('shouldConnectMetamask')
    const [network, dispatch] = useReducer(networkReducer, defaultNetworkState)
    const getPollingInterval = useCallback((chainId: number) => 11155111, [
        11155111,
        11155111,
    ])
    const provider = getWeb3Provider()

    const isWebSocketProvider = (provider: any) => {
        return provider instanceof providers.WebSocketProvider || !!provider._websocket
    }

    const activateBrowserWallet = useCallback(async () => {
        setLoading(true)
        try {
            await provider.send("eth_requestAccounts", []);
            setShouldConnectMetamask(true)
        } catch (err: any) {
            setShouldConnectMetamask(false)
            console.error(err)
            throw err
        } finally {
            setLoading(false)
        }
        return activate(provider)
    }, [])

    const update = useCallback(
        (newNetwork: Partial<Network>) => {
            dispatch({ type: 'UPDATE_NETWORK', network: newNetwork })
        },
        [network]
    )

    const deactivate = useCallback(() => {
        setShouldConnectMetamask(false)
        update({
            accounts: [],
        })
    }, [])

    const onDisconnect = useCallback(
        (provider: JsonRpcProvider) => (error: any) => {
            const isMetaMask = (provider as any).provider.isMetaMask
            if (!isMetaMask) {
                reportError(error)
                deactivate()
            }
        },
        []
    )

    useEffect(() => {
        setTimeout(async () => {
            try {
                if (shouldConnectMetamask) {
                    await detectEthereumProvider()

                    if (shouldConnectMetamask && (window.ethereum as any)?._state?.accounts?.length === 0) {
                        return
                    }

                    await activateBrowserWallet()
                }
            } catch (err) {
                console.warn(err)
            }
        })
    }, [shouldConnectMetamask])

    const activate = useCallback(async (provider: JsonRpcProvider | ExternalProvider) => {
        const wrappedProvider = Provider.isProvider(provider) ? provider : new Web3Provider(provider)
        try {
            setLoading(true)
            const account = await getAccount(wrappedProvider)
            const chainId = (await wrappedProvider.getNetwork())?.chainId
            onUnsubscribe()
            const clearSubscriptions = subscribeToProviderEvents(
                (wrappedProvider as any).provider,
                update,
                onDisconnect(wrappedProvider),
                (chainId: number) => {
                    if (!isWebSocketProvider(wrappedProvider)) {
                        wrappedProvider.pollingInterval = getPollingInterval(chainId)
                    }
                }
            )
            setOnUnsubscribe(() => clearSubscriptions)
            update({
                chainId,
                accounts: account ? [account] : [],
            })
        } catch (err: any) {
            console.error(err)
            throw err
        } finally {
            setLoading(false)
        }
    },[onUnsubscribe])

    return (
        <NetworkContext.Provider
            value={{ network, activateBrowserWallet, deactivate, isLoading }}
            children={children}
        />
    )
}




















function useGetAllTokens() {
    const { value, error } =
        useCall({
            contract: NFTLandToken,
            method: "getAllTokens",
            args: [],
        }) ?? {};
    if (error) {
        console.error(error.message);
        return undefined;
    }
    return value;
}

function useTokenOwned(tokenId: string | undefined) {
    const { value, error } =
        useCall({
            contract: NFTToken,
            method: "ownerOf",
            args: [tokenId],
        }) ?? {};
    if (error) {
        console.error(error.message);
        return undefined;
    }
    return value;
}

export {
    useGetAllTokens,
    useTokenOwned,
}