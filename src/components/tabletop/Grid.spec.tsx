import * as React from "react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { Grid } from "./Grid";

const renderSVG = (
  ui: React.ReactElement,
  options?: RenderOptions
): RenderResult =>
  render(
    ui,
    {
      container:
        document.body.appendChild(
          document.createElementNS("http://www.w3.org/2000/svg", "svg")),
      ...options,
    });

describe("Grid component", () =>
{ 
  it("Has an SVG rect.", () =>
  {
    const { getByTestId } = renderSVG(<Grid />);

    expect(getByTestId("grid-rect").nodeName).toBe("rect");
  });
});