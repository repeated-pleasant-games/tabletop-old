import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { v4 as uuidv4 } from "uuid";

import Tabletop from "./Tabletop";
import { SharedStoreProvider } from "@/context/SharedStore";

describe("Tabletop", () =>
{
  it("Renders an SVG component.", () =>
  {
    const { container } = render(
      <SharedStoreProvider room={uuidv4()}>
        <Tabletop grid={null} />
      </SharedStoreProvider>
    );

    expect(container.firstChild.nodeName).toBe("svg");
  });

  it("Has an id of 'tabletop'.", () =>
  {
    const { container } = render(
      <SharedStoreProvider room={uuidv4()}>
        <Tabletop grid={null} />
      </SharedStoreProvider>
    );

    expect(container.firstChild).toHaveAttribute("id", "tabletop");
  });

  it("Renders the Grid component passed to it.", () =>
  {
    const Grid = () => (<rect data-testid="grid" />);

    const { getByTestId } = render(
      <SharedStoreProvider room={uuidv4()}>
        <Tabletop grid={<Grid />} />
      </SharedStoreProvider>
    );

    expect(getByTestId("grid")).toBeInTheDocument();
  });
});