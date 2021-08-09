import * as React from "react"
import * as ReactDOM from "react-dom"

import {
  ChakraProvider,
  ColorModeScript,
  extendTheme
} from "@chakra-ui/react";
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
  },
  components: {
    Table: {
      parts: [ "th" ],
      baseStyle: {
        th: {
          fontWeight: "normal"
        }
      }
    }
  }
});

ReactDOM.render(
  <>
    <ColorModeScript initialColorMode={"system"} />
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </>,
  document.getElementById("app")
);