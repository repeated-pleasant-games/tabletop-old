import * as React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { fireEvent } from "@testing-library/react";
import { renderSVG } from "~/test-utilities";

import "@testing-library/jest-dom/extend-expect";
import "~/pointer-event";

import Token, { Token as DisconnectedToken, tokenTestId } from "./Token";
import { viewTransform } from "~/reducers/tabletop";
import { setViewTransform } from "~/actions/tabletop";
import { apply, inverseOf, translation } from "~/core/Transform";

describe("Disconnected Token", () =>
{
  it("Has a SVG circle.", () =>
  {
    const { getByTestId } = renderSVG(<DisconnectedToken x={0} y={0} cellSize={1} />);

    expect(getByTestId(tokenTestId).nodeName).toEqual("rect");
  });

  it("Has given x and y coordinates.", () =>
  {
    const { getByTestId } = renderSVG(<DisconnectedToken x={10} y={11} cellSize={1} />);

    expect(getByTestId(tokenTestId)).toHaveAttribute("x", "10");
    expect(getByTestId(tokenTestId)).toHaveAttribute("y", "11");
  });

  it("Has a width and height equal to the given cell size.", () =>
  {
    const { getByTestId } = renderSVG(<DisconnectedToken x={0} y={0} cellSize={16} />);

    expect(getByTestId(tokenTestId)).toHaveAttribute("width", "16");
    expect(getByTestId(tokenTestId)).toHaveAttribute("height", "16");
  });

  it("Follows pointer when user clicks and drags.", () =>
  {
    const { getByTestId } = renderSVG(<DisconnectedToken x={0} y={0} cellSize={16} />);

    const token = getByTestId(tokenTestId);

    fireEvent.pointerDown(token);
    fireEvent.pointerMove(token, { clientX: 20, clientY: 20 });

    expect(token).toHaveAttribute("x", "20");
    expect(token).toHaveAttribute("y", "20");
  });

  it("Does not follow pointer when pointer is not down.", () =>
  {
    const { getByTestId } = renderSVG(<DisconnectedToken x={0} y={0} cellSize={16} />);

    const token = getByTestId(tokenTestId);

    fireEvent.pointerMove(token, { clientX: 20, clientY: 20 });

    expect(token).toHaveAttribute("x", "0");
    expect(token).toHaveAttribute("y", "0");
  });

  it("Does not follow pointer after pointer is released.", () =>
  {
    const { getByTestId } = renderSVG(<DisconnectedToken x={0} y={0} cellSize={16} />);

    const token = getByTestId(tokenTestId);

    fireEvent.pointerDown(token);
    fireEvent.pointerUp(token);
    fireEvent.pointerMove(token, { clientX: 20, clientY: 20 });

    expect(token).toHaveAttribute("x", "0");
    expect(token).toHaveAttribute("y", "0");
  });

  it("Follows pointer if button 0 is pressed.", () =>
  {
    const { getByTestId } = renderSVG(<DisconnectedToken x={0} y={0} cellSize={16} />);

    const token = getByTestId(tokenTestId);

    fireEvent.pointerDown(token, { button: 0 });
    fireEvent.pointerMove(token, { clientX: 20, clientY: 20 });

    expect(token).toHaveAttribute("x", "20");
    expect(token).toHaveAttribute("y", "20");
  });

  it("Does not follow pointer if button 0 is not pressed.", () =>
  {
    const { getByTestId } = renderSVG(<DisconnectedToken x={0} y={0} cellSize={16} />);

    const token = getByTestId(tokenTestId);

    fireEvent.pointerDown(token, { button: 1 });
    fireEvent.pointerMove(token, { clientX: 20, clientY: 20 });

    expect(token).toHaveAttribute("x", "0");
    expect(token).toHaveAttribute("y", "0");
  });

  it("Does not stop following pointer if button release is not 0.", () =>
  {
    const { getByTestId } = renderSVG(<DisconnectedToken x={0} y={0} cellSize={16} />);

    const token = getByTestId(tokenTestId);

    fireEvent.pointerDown(token, { button: 0 });
    fireEvent.pointerUp(token, { button: 1 });
    fireEvent.pointerMove(token, { clientX: 20, clientY: 20 });

    expect(token).toHaveAttribute("x", "20");
    expect(token).toHaveAttribute("y", "20");
  });
});

describe("Connected Token", () =>
{
  it("Has transform attribute equal to viewTransform.", () =>
  {
    const store = createStore(combineReducers({ viewTransform }));

    const { getByTestId } = renderSVG(
      <Provider store={store}>
        <Token x={0} y={0} cellSize={16} />
      </Provider>
    );

    expect(getByTestId(tokenTestId))
      .toHaveAttribute("transform", "matrix(1,0,0,1,0,0)");
  });

  it("Adjusts pointer x and y using viewTransform.", () =>
  {
    const store = createStore(combineReducers({ viewTransform }));
    store.dispatch(setViewTransform(translation(10, 20)));

    const { getByTestId } = renderSVG(
      <Provider store={store}>
        <Token x={0} y={0} cellSize={16} />
      </Provider>
    );

    const token = getByTestId(tokenTestId);

    fireEvent.pointerDown(token);
    fireEvent.pointerMove(token, { clientX: 4, clientY: 3 });

    expect(token).toHaveAttribute("x", /* 4 - 10 = */ "-6");
    expect(token).toHaveAttribute("y", /* 3 - 20 = */ "-17");
  });
});