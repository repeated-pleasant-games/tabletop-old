import * as React from "react"
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

import Tabletop from "~/components/tabletop/Tabletop";
import { RectangularGrid } from "~/components/tabletop/RectangularGrid";

import { viewTransform, actors } from "./reducers/tabletop";
import ControlPanel from "./components/control-panel/ControlPanel";

export const App = () =>
(
  <Provider store={createStore(combineReducers({ viewTransform, actors }))}>
    <ControlPanel />
    <Tabletop grid={<RectangularGrid />} />
  </Provider>
);