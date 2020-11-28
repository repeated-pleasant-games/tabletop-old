import * as React from "react";
import { renderSVG } from "~/test-utilities";
import "@testing-library/jest-dom/extend-expect";

import { RectangularGridPattern, patternTestId } from "./RectangularGridPattern";

describe("RectangularGridPattern component", () =>
{
  it("Has a <defs> tag at the top-level.", () =>
  {
    const { container } = renderSVG(
      <RectangularGridPattern id={null} />
    );

    expect(container.firstChild.nodeName).toBe("defs");
  });

  it("Has a <pattern> with id equal to 'patternId'.", () =>
  {
    const { getByTestId } = renderSVG(
      <RectangularGridPattern id="rectangular-grid" />
    );

    expect(getByTestId(patternTestId).nodeName).toBe("pattern");
    expect(getByTestId(patternTestId)).toHaveAttribute(
      "id",
      "rectangular-grid");
  });
});