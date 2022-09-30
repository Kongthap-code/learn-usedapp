import { Box, Button, Container, Flex, Image, Spacer, Text, useColorMode } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGamepad, faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { Link } from "wouter";
import TokenBalance from "../MatamaskConnect";
import gradient from "@/assets/stitches-gradient.svg"

function Menu(props: any) {
    return (
        <Link href={props.href}>
            <Text
                display={["none", "none", "none", "flex", "flex"]}
                p="2.5"
                color="fg"
                fontSize={"12"}
                fontWeight="900"
                _hover={{ cursor: "pointer", color: "rgb(100 116 139)" }}
            >
                {props.children}
            </Text>
        </Link>
    );
}

function Header() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <>
            <Box
                position="fixed"
                w="100%"
                py="3"
                px="2"
                zIndex="2"
            // bg="linear-gradient(360deg, rgba(255,255,255,0) 0%, rgba(20,20,20,0.7077424719887955) 100%)"
            >
                <Flex
                    alignItems="center">
                    <Container maxW={['100%', '100%', '90%', '65%', '65%']}>
                        <Flex h="64px" justifyContent="center" alignItems="center">
                            <Menu href="/">WHITEPAPER</Menu>
                            <Menu href="/">CANDYMACHINE</Menu>
                            <Menu href="/">ROADMAP</Menu>
                            <Menu href="/app/marketplace">MARKETPLACE</Menu>
                            <Spacer />
                            <TokenBalance />
                            <Button h="9" shadow="sh" borderRadius="10" bg="accent-sub" _hover={{
                                transform: "all 0.4s",
                                mt: "2px",
                                shadow: "sh-hover"
                            }} onClick={toggleColorMode}>
                                {colorMode === 'light' ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
                            </Button>
                        </Flex>
                    </Container>
                </Flex>
            </Box >
            {/* <Box
                w="100%"
                h="100%"
                backgroundImage={gradient}
                pos="absolute"
                backgroundSize="100% auto"
                backgroundRepeat="no-repeat"
                left="0"
                top="0"
                zIndex="-1"
            /> */}
        </>
    )
}

export default Header