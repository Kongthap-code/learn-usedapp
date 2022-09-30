import { Flex, Container, Box, Text, SimpleGrid, Image } from "@chakra-ui/react"
import Marketplace from "../Marketplace"

function Body() {

    return (
        <Box h="100vh" w="100vw">
            <Box pt="180px" pb="60px">
                <Marketplace />
            </Box>
        </Box>
    )
}

export default Body