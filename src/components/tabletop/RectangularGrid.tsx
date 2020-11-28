import * as React from "react";

import { Grid } from "./Grid";
import { RectangularGridPattern } from "./RectangularGridPattern";

export const RectangularGrid = () => (
  <>
    <RectangularGridPattern />
    <Grid patternId={null} />
  </>
);