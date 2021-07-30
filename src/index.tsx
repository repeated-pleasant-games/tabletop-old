import * as React from "react"
import * as ReactDOM from "react-dom"

import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import App from "./App";

const theme = extendTheme({
  config: {
    cssVarPrefix: "rpg",
    initialColorMode: "light",
    useSystemColorMode: true,
  }
})

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <CSSReset />
    <App />
  </ChakraProvider>,
  document.getElementById("app")
);