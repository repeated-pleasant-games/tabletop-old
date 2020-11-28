import * as React from "react";
import { renderSVG } from "~/test-utilities";
import "@testing-library/jest-dom/extend-expect";

import { gridTestId } from "./Grid";
import { RectangularGrid } from "./RectangularGrid";

describe("RectangularGrid component", () =>
{ 
  it("Renders a Grid component", () =>
  {
    const { getByTestId } = renderSVG(<RectangularGrid />);

    expect(getByTestId(gridTestId)).toBeInTheDocument();
  });
});