import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"

import App from "./App"
import { viewTransform, actors, snapToGrid } from "./reducers/tabletop"
import { theme } from "./reducers/app";

import "./styles/style.css"

ReactDOM.render(
  <Provider
    store={
      createStore(
        combineReducers({
          viewTransform,
          actors,
          snapToGrid,
          theme,
        }),
        {
          theme: 
            window.document.documentElement.style.getPropertyValue("--initial-theme")
        },
        applyMiddleware(
          thunk
        )
      )
    }
  >
    <App />
  </Provider>,
  document.getElementById("app")
)