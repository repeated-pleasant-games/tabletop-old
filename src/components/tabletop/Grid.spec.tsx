import * as React from "react";
import { renderSVG } from "~/test-utilities";
import "@testing-library/jest-dom/extend-expect";

import { Grid } from "./Grid";

describe("Grid component", () =>
{ 
  it("Has a SVG rect.", () =>
  {
    const { getByTestId } = renderSVG(<Grid patternId={null} />);

    expect(getByTestId("grid-rect").nodeName).toBe("rect");
  });

  it("Spans the full height and width of the Tabletop", () => 
  {
    const { getByTestId } = renderSVG(<Grid patternId={null} />);

    const gridRect = getByTestId("grid-rect");

    expect(gridRect).toHaveAttribute("width", "100%");
    expect(gridRect).toHaveAttribute("height", "100%");
  });

  it("Filled with the pattern set by patternId.", () =>
  {
    const { getByTestId } = renderSVG(<Grid patternId="some-pattern-id" />);

    expect(getByTestId("grid-rect")).toHaveAttribute(
      "fill",
      "url(#some-pattern-id)");
  });
});