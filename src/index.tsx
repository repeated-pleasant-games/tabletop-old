import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore } from "redux"

import vttReducer from "./reducers/vtt"

import { App } from "./App"

import "./styles/style.css"


ReactDOM.render(
    <Provider store={createStore(vttReducer)}>
        <App />
    </Provider>,
    document.getElementById("app")
)