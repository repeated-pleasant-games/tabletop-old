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
    const { getByTestId } = renderSVG(<Token />);

    expect(getByTestId(tokenTestId).nodeName).toEqual("circle");
  });
});