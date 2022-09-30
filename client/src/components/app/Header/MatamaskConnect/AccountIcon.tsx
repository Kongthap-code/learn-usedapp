import { Box, Flex } from '@chakra-ui/react'
import Jazzicon from '@metamask/jazzicon'
import { useEthers } from '@usedapp/core'
import { useEffect, useRef } from 'react'

export interface AccountIconProps {
    account?: string
}

export function AccountIcon({ account }: AccountIconProps) {
    const { account: walletAccount } = useEthers()
    const address = account ?? walletAccount

    const accountIconRef = useRef<any>(null)
    useEffect(() => {
        if (address && accountIconRef.current) {
            accountIconRef.current.innerHTML = ''
            accountIconRef.current.appendChild(Jazzicon(16, parseInt(address.slice(2, 10), 16)))
        }
    }, [address, accountIconRef])

    return <Box h="16px" w="16px" ref={accountIconRef} />
}
