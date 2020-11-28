import * as React from "react";
import { renderSVG } from "~/test-utilities";
import "@testing-library/jest-dom/extend-expect";

import { RectangularGridPattern } from "./RectangularGridPattern";

describe("RectangularGridPattern component", () =>
{
  it("Has a <defs> tag at the top-level.", () =>
  {
    const { container } = renderSVG(<RectangularGridPattern />);

    expect(container.firstChild.nodeName).toBe("defs");
  })
});