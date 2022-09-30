import { Box, Button, Container, Flex } from "@chakra-ui/react"
import { Link, useRoute } from "wouter";

function Error() {
    const [match, params] = useRoute("/app/marketplace/token/:tokenId");
    return (
        <>
            <Box h="100vh" pt="100px" pb="60px">
                <Container w="100vw" h="100%" maxW={['100%', '100%', '95%', '60%', '60%']}>
                    <Flex direction="column" justifyContent="center" h="100%" alignItems="center">
                        <Box fontSize="40" lineHeight="1.4em">Oops</Box>
                        <Box>Client error. Message from client: Entity with key</Box>
                        <Box>marketplace/token/{params?.tokenId}</Box>
                        <Flex gap="2" mt="2">
                            <Link href={`/app/marketplace/`}>
                            <Button
                                mx="3"
                                h="9"
                                px="3"
                                color="fg"
                                fontSize="12"
                                >Go to market</Button>
                            </Link>
                        </Flex>
                    </Flex>
                </Container>
            </Box>
        </>
    )
}

export default Error