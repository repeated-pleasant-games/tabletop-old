import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { combineReducers, createStore } from "redux"

import { viewTransform } from "./reducers/tabletop";

import { App } from "./App"

import "./styles/style.css"


ReactDOM.render(
    <Provider store={createStore(combineReducers({ viewTransform }))}>
        <App />
    </Provider>,
    document.getElementById("app")
)