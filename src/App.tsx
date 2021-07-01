import * as React from "react"

import Tabletop from "~/components/tabletop/Tabletop";
import { RectangularGrid } from "~/components/tabletop/RectangularGrid";

import ControlPanel from "./components/control-panel/ControlPanel";
import { connect } from "react-redux";

export const App = () =>
(
  <main style={{ width: "100%", height: "100%" }}>
    <ControlPanel />
    <Tabletop grid={<RectangularGrid />} />
  </main>
);

export default App;