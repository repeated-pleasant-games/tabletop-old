import * as React from "react"

import { Tabletop } from "~/components/tabletop/Tabletop";
import { RectangularGrid } from "~/components/tabletop/RectangularGrid";

export const App = () =>
(
  <Tabletop grid={<RectangularGrid />} />
);