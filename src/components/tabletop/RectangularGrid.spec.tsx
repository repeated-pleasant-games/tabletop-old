import * as React from "react";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { renderSVG } from "~/test-utilities";
import "@testing-library/jest-dom/extend-expect";

import { viewTransform } from "~/reducers/tabletop";

import { rectangularPatternTestId } from "./RectangularGridPattern";
import { gridTestId } from "./Grid";
import { RectangularGrid } from "./RectangularGrid";

describe("RectangularGrid component", () =>
{ 
  it("Renders a connected Grid component", () =>
  {
    const store = createStore(combineReducers({ viewTransform }));

    const { getByTestId } = renderSVG(
      <Provider store={store}>
        <RectangularGrid />
      </Provider>);

    expect(getByTestId(gridTestId)).toBeInTheDocument();
  });

  it("Renders a connected RectangularGridPattern component", () =>
  {
    const store = createStore(combineReducers({ viewTransform }));

    const { getByTestId } = renderSVG(
      <Provider store={store}>
        <RectangularGrid />
      </Provider>);

    expect(getByTestId(rectangularPatternTestId)).toBeInTheDocument();
  });
});