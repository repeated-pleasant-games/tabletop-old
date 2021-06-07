import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { Tabletop as DisconnectedTabletop } from "./Tabletop";

describe("Disconnected Tabletop component", () =>
{
  it("Renders an SVG component.", () =>
  {
    const { container } = render(<DisconnectedTabletop grid={null} />);

    expect(container.firstChild.nodeName).toBe("svg");
  });

  it("Has an id of 'tabletop'.", () =>
  {
    const { container } = render(<DisconnectedTabletop grid={null} />);

    expect(container.firstChild).toHaveAttribute("id", "tabletop");
  });

  it("Renders the Grid component passed to it.", () =>
  {
    const Grid = () => (<rect data-testid="grid" />);

    const { getByTestId } = render(<DisconnectedTabletop grid={<Grid />} />);

    expect(getByTestId("grid")).toBeInTheDocument();
  });
});