import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools"
import config from "./foundations/config";
import fonts from "./foundations/fonts";
import semanticTokens from "./foundations/semanticTokens";

const theme = extendTheme({
  config,
  semanticTokens,
  fonts,
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode("#fff", "#0d0e12")(props),
        color: mode("#4A5568", "#fff")(props)
      }
    })
  },
});

export default theme;

