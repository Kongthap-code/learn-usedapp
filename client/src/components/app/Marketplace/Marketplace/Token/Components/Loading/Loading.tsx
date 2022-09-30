import { Badge, Box, Button, Container, Divider, Flex, Heading, Image, SimpleGrid, Skeleton, space, Spacer, Spinner, Stack, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "wouter";

function Loading() {
    return (
        <Box h="100vh" pt="120px" pb="180px">
            <Container w="100vw" maxW={['100%', '100%', '95%', '60%', '60%']}>
                <Flex mb="7">
                    <Box w="50%">
                        <Flex fontSize="14" color="fg">
                            <Link href="/app/marketplace">
                                <Flex cursor="pointer" alignItems="center" >
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                    <Text fontWeight="normal" ml="2">Back</Text>
                                </Flex>
                            </Link>
                        </Flex>
                    </Box>
                </Flex>
            </Container>
            <Flex justifyContent="center" h="100%" alignItems="center">
                <Spinner size="xl" />
            </Flex>
        </Box>
    )
}

export default Loading