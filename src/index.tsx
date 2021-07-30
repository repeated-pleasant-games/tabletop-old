import * as React from "react"
import * as ReactDOM from "react-dom"

import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import App from "./App";

import "./index.css";

ReactDOM.render(
  <ChakraProvider>
    <CSSReset />
    <App />
  </ChakraProvider>,
  document.getElementById("app")
);