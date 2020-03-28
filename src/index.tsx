import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore } from "redux"

import appState from "./reducers"

import { App } from "./App"

import "./styles/style.sass"


ReactDOM.render(
    <Provider store={createStore(appState)}>
        <App />
    </Provider>,
    document.getElementById("app")
)