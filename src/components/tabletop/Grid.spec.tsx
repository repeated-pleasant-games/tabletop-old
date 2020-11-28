import * as React from "react";
import { renderSVG } from "~/test-utilities";
import "@testing-library/jest-dom/extend-expect";

import { Grid, gridTestId } from "./Grid";

describe("Grid component", () =>
{ 
  it("Has a SVG rect.", () =>
  {
    const { getByTestId } = renderSVG(<Grid patternId={null} />);

    expect(getByTestId(gridTestId).nodeName).toBe("rect");
  });

  it("Spans the full height and width of the Tabletop", () => 
  {
    const { getByTestId } = renderSVG(<Grid patternId={null} />);

    const gridRect = getByTestId(gridTestId);

    expect(gridRect).toHaveAttribute("width", "100%");
    expect(gridRect).toHaveAttribute("height", "100%");
  });

  it("Filled with the pattern set by patternId.", () =>
  {
    const { getByTestId } = renderSVG(<Grid patternId="some-pattern-id" />);

    expect(getByTestId(gridTestId)).toHaveAttribute(
      "fill",
      "url(#some-pattern-id)");
  });

  it("Has fill 'none' when patternId is null.", () =>
  {
    const { getByTestId } = renderSVG(<Grid patternId={null} />);

    expect(getByTestId(gridTestId)).toHaveAttribute("fill", "none");
  });
});