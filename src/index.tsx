import * as React from "react"
import * as ReactDOM from "react-dom"

import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import App from "./App";

const theme = extendTheme({
  config: {
    cssVarPrefix: "rpg",
    initialColorMode: "light",
    useSystemColorMode: true,
  },
  fonts: {
    body: "Lato, system-ui, sans-serif",
    heading: "Germania One, Impact, system-ui, sans-serif",
  }
})

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <CSSReset />
    <App />
  </ChakraProvider>,
  document.getElementById("app")
);