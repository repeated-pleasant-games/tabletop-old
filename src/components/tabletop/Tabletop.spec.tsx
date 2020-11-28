import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { Tabletop } from "./Tabletop";

describe("Tabletop component", () =>
{
  it("Renders an SVG component.", () =>
  {
    const { container } = render(<Tabletop grid={null} />);

    expect(container.firstChild.nodeName).toBe("svg");
  });

  it("Has an id of 'tabletop'.", () =>
  {
    const { container } = render(<Tabletop grid={null} />);

    expect(container.firstChild).toHaveAttribute("id", "tabletop");
  });

  it("Renders the Grid component passed to it.", () =>
  {
    const Grid = () => (<rect data-testid="grid" />);

    const { getByTestId } = render(<Tabletop grid={<Grid />} />);

    expect(getByTestId("grid")).toBeInTheDocument();
  });
});