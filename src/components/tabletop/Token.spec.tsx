import * as React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { fireEvent } from "@testing-library/react";
import { renderSVG } from "~/test-utilities";
import "@testing-library/jest-dom/extend-expect";

import { Token, tokenTestId } from "./Token";

describe("Disconnected Token", () =>
{
  it("Has an SVG circle.", () =>
  {
    const { getByTestId } = renderSVG(<Token x={0} y={0} />);

    expect(getByTestId(tokenTestId).nodeName).toEqual("rect");
  });

  it("Has given x and y coordinates.", () =>
  {
    const { getByTestId } = renderSVG(<Token x={10} y={11} />);

    expect(getByTestId(tokenTestId)).toHaveAttribute("x", "10");
    expect(getByTestId(tokenTestId)).toHaveAttribute("y", "11");
  });
});