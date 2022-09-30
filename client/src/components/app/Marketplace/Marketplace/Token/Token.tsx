import { Box, Button, Container, Flex, Image, SimpleGrid, Skeleton, Spacer, Spinner, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import { Link, useRoute } from "wouter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { formatEther } from "@ethersproject/units";
import { useGetAllTokens, useTokenOwned } from "@/components/Contracts/Network/provider";
import { useEthers } from "@usedapp/core";
import { getToken } from "@/components/api/api";
import Loading from "./Components/Loading";
import Error from "./Components/Error";
import ConfirmModal from "./Components/ConfirmModal/ConfirmModal";
import shadow from "@/assets/shadow.png"

export function Token() {
    const [match, params] = useRoute("/app/marketplace/token/:tokenId");
    const Token = useGetAllTokens();
    const { data, isLoading, isError } = useQuery(['token#' + params?.tokenId], () => getToken(params?.tokenId))
    const { account } = useEthers()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const tokenOwned = useTokenOwned(params?.tokenId)

    return (
        isLoading
            ? <Loading />
            : isError
                ? <Error />
                : data ? (
                    <>
                        <ConfirmModal isOpen={isOpen} onClose={onClose} data={{ data, tag: params?.tokenId, price: Token ? Token[1][data.id] : null }} />
                        <Box h="100vh" pt="120px" pb="60px">
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
                                        <Text color="fg" fontSize="25" fontWeight="bold">{data.name} #{params?.tokenId}</Text>
                                    </Box>
                                    <Spacer />
                                    {Token ? formatEther(Token[1][data.id]) !== "0.0" ?
                                        <>
                                            <Flex alignItems="center" direction="row" mr="5">
                                                <Flex direction="column">
                                                    <Box fontSize="23" lineHeight="1em" color="fg" fontWeight="900" fontFamily="'Mukta', sans-serif">Ξ {Token ? formatEther(Token[1][data.id]) : null}</Box>
                                                    <Box color="fg-secondary">$4</Box>
                                                </Flex>
                                            </Flex>
                                            <Flex justifyContent="center" alignItems="center">
                                                {account ?
                                                    <Flex
                                                        h="10"
                                                        px="4"
                                                        borderRadius="10"
                                                        color="fg"
                                                        bg="primary-gradient"
                                                        _hover={{ bg: "primary-hover" }}
                                                        _active={{ bg: "primary-active" }}
                                                        fontSize="14"
                                                        direction="row"
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        cursor="pointer"
                                                        onClick={onOpen}
                                                    >
                                                        <FontAwesomeIcon icon={faCartShopping} /><Text ml="2">Buy now</Text>
                                                    </Flex>
                                                    :
                                                    <Tooltip color="fg" bg="accent-secondary" hasArrow label='Please Connect wallet to buy this' placement='top' shouldWrapChildren>
                                                        <Button
                                                            h="10"
                                                            px="4"
                                                            borderRadius="10"
                                                            color="fg"
                                                            fontSize="14"
                                                            disabled={true}
                                                        >
                                                            <FontAwesomeIcon icon={faCartShopping} /><Text ml="2">Buy now</Text>
                                                        </Button>
                                                    </Tooltip>
                                                }
                                            </Flex>
                                        </>
                                        : null
                                        : null}
                                </Flex>
                                <Flex>
                                    <Flex pos="relative" alignItems="center" direction="column" justifyContent="center" w="50%">
                                        <Image
                                            top="10"
                                            h="150px"
                                            pos="absolute"
                                            src={data.image}
                                            alt="preview"
                                            zIndex="1"
                                        />
                                        <Image
                                            top="1"
                                            h="300"
                                            pos="absolute"
                                            src={shadow}
                                            alt="preview"
                                            zIndex="-1"
                                        />
                                    </Flex>
                                    <Box w="50%" h="100%">
                                        <Text color="fg" mt="2" fontWeight="bold" mb="2">
                                            About
                                        </Text>
                                        <Box w="full" bg="card" p="4" borderRadius="8">
                                            <SimpleGrid
                                                columns={[2]}
                                                row={[2]}
                                                w="100%"
                                                mb="2"
                                                columnGap="5"
                                            >
                                                <Box>
                                                    <Box color="fg-secondary" fontSize="12">Name</Box>
                                                    <Box fontSize="12">{data.name}</Box>
                                                </Box>
                                                <Box>
                                                    <Box color="fg-secondary" fontSize="12">Tag</Box>
                                                    <Box fontSize="12">#{params?.tokenId}</Box>
                                                </Box>
                                                <Box>
                                                    <Box color="fg-secondary" fontSize="12">Owned by</Box>
                                                    <Box fontSize="12">{tokenOwned ?
                                                        <Box textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">
                                                            {tokenOwned ?
                                                                (tokenOwned.toString() === import.meta.env.VITE_NFT_LAND_ADDRESS ?
                                                                    "Marketplace" : tokenOwned
                                                                )
                                                                : null}
                                                        </Box>
                                                        :
                                                        "Loading..."
                                                    }</Box>
                                                </Box>
                                            </SimpleGrid>
                                            <Box color="fg-secondary" fontSize="12">Description</Box>
                                            <Box fontSize="12">
                                                {data.description}
                                            </Box>
                                        </Box>
                                    </Box>
                                </Flex>
                            </ Container>
                        </Box>
                    </>
                ) : null
    )
}