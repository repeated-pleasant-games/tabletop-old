import * as React from "react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { Token } from "~/components/vtt/Token";

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

test("Is a circle", () => {
  const { container } = renderSVG(
    <Token
      actor={null}
      cellDimension={25}
      vttTransform={[1,0,0,1,0,0]}
    />);

  expect(container.firstChild.nodeName).toBe("circle");
});