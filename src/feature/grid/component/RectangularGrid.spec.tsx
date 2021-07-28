import * as React from "react";
import "@testing-library/jest-dom/extend-expect";

import { renderSVG } from "@/test/render-svg";

import { rectangularPatternTestId } from "./RectangularGridPattern";
import { gridTestId } from "./Grid";
import { RectangularGrid } from "./RectangularGrid";

describe("RectangularGrid component", () =>
{ 
  it("Renders a connected Grid component", () =>
  {
    const { getByTestId } = renderSVG(<RectangularGrid />);

    expect(getByTestId(gridTestId)).toBeInTheDocument();
  });

  it("Renders a connected RectangularGridPattern component", () =>
  {
    const { getByTestId } = renderSVG(<RectangularGrid />);

    expect(getByTestId(rectangularPatternTestId)).toBeInTheDocument();
  });
});