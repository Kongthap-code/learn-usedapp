import { Flex, Container, Box, Text, SimpleGrid, Image } from "@chakra-ui/react"
import { useQueries } from "@tanstack/react-query";
import { formatEther } from "@ethersproject/units";
import { Link } from "wouter";
import { Vibrant } from "@/components/Vibrant/Vibrant";
import { useGetAllTokens } from "@/components/Contracts/Network/provider";
import { getAllToken } from "@/components/api/api";
import eth from "@/assets/eth.png"

function Marketplace() {
    const Items: Function = (): JSX.Element[] => {
        const Token = useGetAllTokens();

        const tokenQueries = useQueries({
            queries: Token
                ? Token[0].map((token: any) => {
                    return {
                        queryKey: ["tokenid", token],
                        queryFn: () => getAllToken(token),
                    };
                })
                : [],
        });

        return tokenQueries.filter((token) => token.isSuccess).map((token: any) => {
            return (
                <Flex justifyContent="center" alignItems="center">
                <Link key={token?.data.id} href={`/app/marketplace/token/${token?.data.id}`}>
                    <Box p="2">
                        <Box _hover={{ mt: "-2", transition: "all 0.3s", borderColor: "box-border", border: "1px" }} transition="all 0.3s" top="-2" w="252px" border="1px" borderColor="box-border" pos="relative" cursor="pointer" borderRadius="10">
                            <Vibrant src={token?.data.image} type="getRgb">
                                {({ data }) => (
                                    <>
                                        <Box bg="card" borderTopRadius="10">
                                            <Box pos="absolute" left="2" top="2">
                                                <Flex bg="card-sub" _hover={{ borderColor: "box-border", border: "1px" }} border="1px" borderColor="#0000" justifyContent="center" alignItems="center" pb="1px" px="8px" borderRadius="8">
                                                    <Image objectFit="cover" w="auto" h="17px" src={token?.data.image} />
                                                    <Text ml="1" mt="0.5" fontSize="14px" color={`rgb(${(data.vibrant)?.toString()})`} fontFamily="'Mukta', sans-serif">#{token?.data.id}</Text>
                                                </Flex>
                                            </Box>
                                            <Flex direction="column" justifyContent="center" alignItems="center" h="240px" bg={`linear-gradient(180deg,rgba(${(data.vibrant)?.toString()},0),rgba(${(data.vibrant)?.toString()},.18))`}>
                                                <Image objectFit="cover" w="auto" h="90px" mt="1" src={token?.data.image} />
                                            </Flex>
                                            {formatEther(Token[1][token?.data.id]) !== "0.0" ?
                                                <Flex direction="column" pos="absolute" top="54%" left="50%" transform="translateX(-50%)" mt="3" justifyContent="center" alignItems="center">
                                                    <Flex justifyContent="center" alignItems="center">
                                                        <Image src={eth} w="auto" h="25px" />
                                                        <Box fontSize="19" color="fg" fontWeight="900" fontFamily="'Mukta', sans-serif" >{formatEther(Token[1][token?.data.id])}</Box>
                                                    </Flex>
                                                    <Box fontSize="13" lineHeight="1em" color="fg">$5</Box>
                                                </Flex>
                                                :
                                                null
                                            }
                                        </Box>
                                    </>
                                )}
                            </Vibrant>
                            <Box bg="card" p="3" borderBottomRadius="10" color="black">
                                <Box fontSize="17" textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">{token?.data.name}</Box>
                                <Flex alignItems="center">
                                    <Box fontSize="13" color="fg" fontWeight="900" mr="1">Description </Box>
                                    <Box fontSize="13" textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden" color="fg-sub" >{token?.data.description}</Box>
                                </Flex>
                            </Box>
                        </Box>
                    </Box>
                </Link>
                </Flex>
            );
        })
    }


    return (
        <>
            <Container color="gray.600" maxW={['100%', '100%', '95%', '66%', '66%']}>
                <SimpleGrid columns={[1, 2, 2, 2, 3, 4]} alignItems="center" justifyContent="center">
                        <Items />
                </SimpleGrid>
            </Container>
        </>
    )
}

export default Marketplace