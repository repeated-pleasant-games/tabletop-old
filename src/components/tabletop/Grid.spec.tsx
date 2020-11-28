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
  it("Has a SVG rect.", () =>
  {
    const { getByTestId } = renderSVG(<Grid pattern={null} />);

    expect(getByTestId("grid-rect").nodeName).toBe("rect");
  });

  it("Spans the full height and width of the Tabletop", () => 
  {
    const { getByTestId } = renderSVG(<Grid pattern={null} />);

    const gridRect = getByTestId("grid-rect");

    expect(gridRect).toHaveAttribute("width", "100%");
    expect(gridRect).toHaveAttribute("height", "100%");
  });

  it("Renders the pattern passed to it.", () =>
  {
    const Pattern = () => (<defs data-testid="pattern"></defs>);

    const { getByTestId } = renderSVG(<Grid pattern={<Pattern />} />);

    expect(getByTestId("pattern")).toBeInTheDocument();
  });
});