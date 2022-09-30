import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Flex,
    Box,
    Image,
    Text,
    Spacer,
    Spinner,
} from "@chakra-ui/react";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatEther } from "@ethersproject/units";
import { useContractFunction } from "@usedapp/core";
import { CoinToken, NFTLandToken } from "@/contract";
import eth from "@/assets/eth.png"

function ConfirmModal(props: any) {
    const { send: approve, state: approveState } = useContractFunction(CoinToken, 'approve')
    const { send: buy, state: buyState } = useContractFunction(NFTLandToken, 'buy')

    const buyToken = (tokenId: string | number) => {
        approve(import.meta.env.VITE_NFT_LAND_ADDRESS, props.data.price)
            .then((value) => value ? buy(tokenId) : null)
    }

    return (
        <Modal size="xl" onClose={props.onClose} isOpen={props.isOpen}>
            <ModalOverlay />
            <ModalContent bg="bg-dialog">
                <ModalHeader>
                    <Flex alignItems="center"><FontAwesomeIcon icon={faTag} /> <Box ml="2">Buy</Box> {props.data.data.name} #{props.data.tag}</Flex>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody bg="bg-dialog" borderRadius="5" p="5">
                    <Flex>
                        <Flex pos="relative" alignItems="center" direction="column" justifyContent="center" w="40%">
                            <Image
                                h={150}
                                w="auto"
                                src={props.data.data.image}
                                p={5}
                                alt="preview"
                                zIndex="1"
                            />
                        </Flex>
                        <Box w="60%" h="100%">

                            <Flex alignItems="center" direction="row">
                                <Text color="fg" mt="2" fontSize="20" fontFamily="'Mukta', sans-serif" fontWeight="bold" mb="2">
                                    Price
                                </Text>
                                <Spacer />
                                <Flex alignItems="center">
                                    <Image src={eth} w="auto" h="20px" />
                                    <Box lineHeight="1em" fontSize="20" ml="1" color="fg" fontFamily="'Mukta', sans-serif">{props.data.price ? formatEther(props.data.price) : null}</Box>
                                </Flex>
                            </Flex>

                            <Box w="full" color="fg-secondary" bg="card-sub" p="4" borderRadius="8">
                                <Box fontFamily="'Mukta', sans-serif" fontWeight="900" fontSize="11">PAY AS</Box>
                                <Box lineHeight="1.3em" fontSize="23" fontFamily="'Mukta', sans-serif">{props.data.price ? formatEther(props.data.price) : null} KC</Box>
                                <Box lineHeight="1.2em" fontSize="13">~$5</Box>
                            </Box>
                            <Flex gap="1" w="full" color="fg-secondary" border="1px" mt="5" borderColor="box-border" p="4" borderRadius="8">
                                <Box fontSize="14" w="60%">
                                    Allow Marketplace to use your KCoin
                                </Box>
                                <Box w="40%">
                                    {(approveState.status &&
                                        (approveState.status != "PendingSignature"
                                            && approveState.status != "Mining") && (buyState.status && (
                                                (buyState.status != "PendingSignature"
                                                    && buyState.status != "Mining")
                                            ))) ?
                                        <Flex
                                            h="10"
                                            px="4"
                                            borderRadius="10"
                                            color="fg"
                                            bg="primary-gradient"
                                            _hover={{
                                                bg: "primary-hover"
                                            }}
                                            _active={{
                                                bg: "primary-active"
                                            }}
                                            fontSize="14"
                                            justifyContent="center"
                                            alignItems="center"
                                            cursor="pointer"
                                            onClick={() => buyToken(props.data.tag)}
                                        >
                                            <Text>Approve KC</Text>
                                        </Flex>
                                        :
                                        <Flex justifyContent="center">
                                            <Button
                                                w="100%"
                                                borderRadius="10"
                                                color="fg"
                                                fontSize="14"
                                                disabled={true}
                                            >
                                                <Spinner />
                                            </Button>
                                        </Flex>
                                    }
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ConfirmModal