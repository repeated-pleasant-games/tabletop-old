import * as React from "react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";

export const renderSVG = (
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