import * as React from "react"
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

import { Tabletop } from "~/components/tabletop/Tabletop";
import { RectangularGrid } from "~/components/tabletop/RectangularGrid";

import { viewTransform, actors } from "./reducers/tabletop";

export const App = () =>
(
  <Provider store={createStore(combineReducers({ viewTransform, actors }))}>
    <Tabletop grid={<RectangularGrid />} />
  </Provider>
);