import * as React from "react"
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

import Tabletop from "~/components/tabletop/Tabletop";
import { RectangularGrid } from "~/components/tabletop/RectangularGrid";

import { viewTransform, actors, snapToGrid } from "./reducers/tabletop";
import ControlPanel from "./components/control-panel/ControlPanel";

export const App = () =>
(
  <Provider
    store={
      createStore(combineReducers({
        viewTransform,
        actors,
        snapToGrid,
      }))
    }
  >
    <main className="day" style={{ width: "100%", height: "100%" }}>
      <ControlPanel />
      <Tabletop grid={<RectangularGrid />} />
    </main>
  </Provider>
);