import * as React from "react";
import { act } from "@testing-library/react";
import { renderSVG } from "~/test-utilities";
import "@testing-library/jest-dom/extend-expect";

import { useLocalStore } from "~/store/local";
import { identityTransform } from "~/core/Transform";

import RectangularGridPattern,
{
  RectangularGridPattern as DisconnectedPattern,
  patternTestId
} from "./RectangularGridPattern";

describe("Disconnected RectangularGridPattern component", () =>
{
  it("Has a <defs> tag at the top-level.", () =>
  {
    const { container } = renderSVG(
      <DisconnectedPattern id={null} cellSize={0} />
    );

    expect(container.firstChild.nodeName).toBe("defs");
  });

  it("Has a <pattern> with id equal to 'patternId'.", () =>
  {
    const { getByTestId } = renderSVG(
      <DisconnectedPattern id="rectangular-grid" cellSize={0} />
    );

    expect(getByTestId(patternTestId).nodeName).toBe("pattern");
    expect(getByTestId(patternTestId)).toHaveAttribute(
      "id",
      "rectangular-grid");
  });

  it("<pattern> has a width and height equal to 'cellSize'.", () =>
  {
    const { getByTestId } = renderSVG(
      <DisconnectedPattern id={null} cellSize={16} />
    );

    expect(getByTestId(patternTestId)).toHaveAttribute("width", "16");
    expect(getByTestId(patternTestId)).toHaveAttribute("height", "16");
  });

  it("<pattern> has a patternUnits set to 'userSpaceOnUse'.", () =>
  {
    const { getByTestId } = renderSVG(
      <DisconnectedPattern id={null} cellSize={16} />
    );

    expect(getByTestId(patternTestId)).toHaveAttribute(
      "patternUnits", "userSpaceOnUse");
  });
});

describe("Connected RectangularGridPattern component", () =>
{
  it("Uses view transform as patternTransform.", () =>
  {
    useLocalStore.setState(() => ({ viewTransform: identityTransform() }));

    const { getByTestId } = renderSVG(
      <RectangularGridPattern id={null} cellSize={16} />
    );

    expect(getByTestId(patternTestId)).toHaveAttribute(
      "patternTransform",
      "matrix(1,0,0,1,0,0)");

    act(() =>
    {
      useLocalStore.setState(() => ({
        viewTransform: [
          [ 1, 0, 2 ],
          [ 0, 1, 3 ],
          [ 0, 0, 1 ]
        ]
      }));
    });

    expect(getByTestId(patternTestId)).toHaveAttribute(
      "patternTransform",
      "matrix(1,0,0,1,2,3)");
  });
});