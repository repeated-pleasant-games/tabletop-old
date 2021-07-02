import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"
import create, { SetState } from "zustand"

import App from "./App"
import { viewTransform, actors, snapToGrid } from "./reducers/tabletop"
import { themePreference } from "./reducers/app";

import { identityTransform, Transform } from "./core/Transform"
import { Actor } from "./core/Actor"

import "./styles/style.css"

type LocalState =
{
  themePreference: "system" | "light" | "dark",
  setThemePreference: (themePreference: "system" | "light" | "dark") => void,

  viewTransform: Transform,
  setViewTransform: (viewTransform: Transform) => void,

  snapToGrid: boolean,
  setSnapToGrid: (snapToGrid: boolean) => void,
};

const useLocalState = create<LocalState>(
  (set, get) =>
  ({
    themePreference: "system",
    setThemePreference:
      (themePreference: "system" | "light" | "dark") =>
        set((_) => ({ themePreference })),

    viewTransform: identityTransform(),
    setViewTransform:
      (viewTransform: Transform) =>
        set((_) => ({ viewTransform })),

    snapToGrid: false,
    setSnapToGrid:
      (snapToGrid: boolean) =>
        set((_) => ({ snapToGrid })),
  })
);

type SharedState =
{
  actors: Actor[],
  addActor: (actor: Actor) => void,
  removeActor: (actorId: string) => void,
};

const useSharedState = create<SharedState>(
  (set, get) =>
  ({
    actors: [],
    addActor:
      (actor: Actor) =>
        set((state) => ({ actors: [ ...state.actors, actor ] })),
    removeActor:
      (actorId: string) =>
        set(
          (state) =>
          ({
            actors: state.actors.filter(({ id }) => id !== actorId)
          })
        )
  })
);

ReactDOM.render(
  <Provider
    store={
      createStore(
        combineReducers({
          viewTransform,
          actors,
          snapToGrid,
          themePreference,
        }),
        {
          themePreference: 
            window.document.documentElement.style.getPropertyValue("--theme-preference")
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
);