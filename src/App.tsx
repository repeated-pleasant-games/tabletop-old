import * as React from "react"
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

import { Tabletop } from "~/components/tabletop/Tabletop";
import { RectangularGrid } from "~/components/tabletop/RectangularGrid";

import { viewTransform, actors } from "./reducers/tabletop";

import Token from "./components/tabletop/Token";

export const App = () =>
(
  <Provider store={createStore(combineReducers({ viewTransform, actors }))}>
    <Tabletop grid={<RectangularGrid />}>
      <Token x={0} y={0} cellSize={16} />
    </Tabletop>
  </Provider>
);