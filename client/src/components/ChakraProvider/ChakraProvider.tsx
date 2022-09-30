import theme from "./theme";
import { ChakraProvider as Provider, ColorModeScript } from "@chakra-ui/react";

function ChakraProvider(props: any) {
  return (
    <Provider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      {props.children}
    </Provider>
  );
}

export default ChakraProvider;
