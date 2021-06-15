import * as React from "react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";

type Queries = typeof import("@testing-library/dom/types/queries");

export const renderSVG = (
  ui: React.ReactElement,
  options?: RenderOptions<Queries, SVGElement>
): RenderResult<Queries, SVGElement> =>
  render<Queries, SVGElement>(
    ui,
    {
      container:
        document.body.appendChild(
          document.createElementNS("http://www.w3.org/2000/svg", "svg")),
      ...options,
    });