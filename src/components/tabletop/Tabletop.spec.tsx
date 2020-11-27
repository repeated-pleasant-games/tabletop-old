import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { Tabletop } from "~/components/tabletop/Tabletop";

describe("TableTop component", () =>
{
  it("Renders an SVG component.", () =>
  {
    const { container } = render(<Tabletop />);

    expect(container.firstChild.nodeName).toBe("svg");
  });

  it("Has an id of 'tabletop'.", () =>
  {
    const { container } = render(<Tabletop />);

    expect(container.firstChild).toHaveAttribute("id", "tabletop");
  });
});