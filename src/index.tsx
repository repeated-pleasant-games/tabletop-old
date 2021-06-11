import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { combineReducers, createStore } from "redux"

import App from "./App"
import { viewTransform, actors, snapToGrid } from "./reducers/tabletop"
import { theme } from "./reducers/app";

import "./styles/style.css"

ReactDOM.render(
  <Provider
    store={
      createStore(combineReducers({
        viewTransform,
        actors,
        snapToGrid,
        theme,
      }))
    }
  >
    <App />
  </Provider>,
  document.getElementById("app")
)