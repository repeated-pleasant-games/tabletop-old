import * as React from "react";

import Grid from "./Grid";
import RectangularGridPattern from "./RectangularGridPattern";

const patternId = "rectangular-grid-pattern";

export const RectangularGrid = () => (
  <>
    <RectangularGridPattern id={patternId} cellSize={16} />
    <Grid patternId={patternId} />
  </>
);