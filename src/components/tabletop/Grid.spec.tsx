import * as React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { fireEvent } from "@testing-library/react";
import { renderSVG } from "~/test-utilities";
import "@testing-library/jest-dom/extend-expect";

import Grid, { Grid as DisconnectedGrid, gridTestId } from "./Grid";
import { viewTransform } from "~/reducers/tabletop";
import { SetViewTransformPayload } from "~/actions/tabletop";

if (!global.PointerEvent)
{
  class PointerEvent extends MouseEvent
  {
    public pointerId?: number;
    public pointerType?: string;

    public isPrimary?: boolean;

    public height?: number;
    public width?: number;

    public pressure?: number;
    public tangentialPressure?: number;

    public tiltX?: number;
    public tiltY?: number;

    public twist?: number;

    constructor(type: string, params: PointerEventInit = {})
    {
      super(type, params);

      this.pointerId = params.pointerId;
      this.pointerType = params.pointerType;
      this.isPrimary = params.isPrimary;
      this.height = params.height;
      this.width = params.width;
      this.pressure = params.pressure;
      this.tangentialPressure = params.tangentialPressure;
      this.tiltX = params.tiltX;
      this.tiltY = params.tiltY;
      this.twist = params.twist;
    }
  }

  global.PointerEvent = PointerEvent as any;
}

describe("Disconnected Grid component", () =>
{ 
  it("Has a SVG rect.", () =>
  {
    const { getByTestId } = renderSVG(<DisconnectedGrid patternId={null} />);

    expect(getByTestId(gridTestId).nodeName).toBe("rect");
  });

  it("Spans the full height and width of the Tabletop", () => 
  {
    const { getByTestId } = renderSVG(<DisconnectedGrid patternId={null} />);

    const gridRect = getByTestId(gridTestId);

    expect(gridRect).toHaveAttribute("width", "100%");
    expect(gridRect).toHaveAttribute("height", "100%");
  });

  it("Filled with the pattern set by patternId.", () =>
  {
    const { getByTestId } = renderSVG(
      <DisconnectedGrid patternId="some-pattern-id" />
    );

    expect(getByTestId(gridTestId)).toHaveAttribute(
      "fill",
      "url(#some-pattern-id)");
  });

  it("Has fill 'none' when patternId is null.", () =>
  {
    const { getByTestId } = renderSVG(<DisconnectedGrid patternId={null} />);

    expect(getByTestId(gridTestId)).toHaveAttribute("fill", "none");
  });
});

describe("Connected Grid component", () =>
{
  it("Translates the view transform when users clicks and drags.", () =>
  {
    const store = createStore(combineReducers({ viewTransform }));

    const { getByTestId } = renderSVG(
      <Provider store={store}>
        <Grid patternId={null} />
      </Provider>
    );

    const grid = getByTestId(gridTestId);
    const pointerId = 0;

    fireEvent.pointerDown(grid, { pointerId, clientX: 0, clientY: 0 });
    fireEvent.pointerMove(
      grid,
      { pointerId, clientX: 10, clientY: 13 });

    expect(store.getState().viewTransform)
      .toStrictEqual([
        [ 1, 0, 10 ],
        [ 0, 1, 13 ],
        [ 0, 0,  1 ]
      ]);
  });

  it("Translates the view relative to the current transform.", () =>
  {
    const store = createStore(combineReducers({ viewTransform }));

    const { getByTestId } = renderSVG(
      <Provider store={store}>
        <Grid patternId={null} />
      </Provider>
    );

    const grid = getByTestId(gridTestId);
    const pointerId = 0;

    store.dispatch({
      type: "set view transform",
      viewTransform: [
        [ 1, 0, 2 ],
        [ 0, 1, 2 ],
        [ 0, 0, 1 ]
      ],
    } as SetViewTransformPayload);

    fireEvent.pointerDown(grid, { pointerId });
    fireEvent.pointerMove(
      grid,
      { pointerId, clientX: 10, clientY: 13 });

    expect(store.getState().viewTransform)
      .toStrictEqual(
        [
          [ 1, 0, 12 ],
          [ 0, 1, 15 ],
          [ 0, 0,  1 ]
        ]);
  });

  it("Does not change view transform when user only drags.", () =>
  {
    const store = createStore(combineReducers({ viewTransform }));

    const { getByTestId } = renderSVG(
      <Provider store={store}>
        <Grid patternId={null} />
      </Provider>
    );

    const grid = getByTestId(gridTestId);

    fireEvent.pointerMove(
      grid,
      { clientX: 10, clientY: 13 });

    expect(store.getState().viewTransform)
      .toStrictEqual([
        [ 1, 0, 0 ],
        [ 0, 1, 0 ],
        [ 0, 0, 1 ],
      ]);
  });

  it("Does not change the view transform after the user releases the mouse", () =>
  {
    const store = createStore(combineReducers({ viewTransform }));

    const { getByTestId } = renderSVG(
      <Provider store={store}>
        <Grid patternId={null} />
      </Provider>
    );

    const grid = getByTestId(gridTestId);

    fireEvent.pointerDown(grid, { pointerId: 0 });
    fireEvent.pointerMove(grid, { pointerId: 0, clientX: 10, clientY: 10 });
    fireEvent.pointerUp(grid, { pointerId: 0 });
    fireEvent.pointerMove(grid, { pointerId: 0, clientX: 0, clientY: 0 });

    expect(store.getState().viewTransform)
      .toStrictEqual([
        [ 1, 0, 10 ],
        [ 0, 1, 10 ],
        [ 0, 0,  1 ],
      ]);
  });

  it("Does not stop updating view transform when another pointer goes up.", () =>
  {
    const store = createStore(combineReducers({ viewTransform }));

    const { getByTestId } = renderSVG(
      <Provider store={store}>
        <Grid patternId={null} />
      </Provider>
    );

    const grid = getByTestId(gridTestId);

    fireEvent.pointerDown(grid, { pointerId: 0 });
    fireEvent.pointerMove(grid, { pointerId: 0, clientX: 10, clientY: 10 });
    fireEvent.pointerUp(grid, { pointerId: 1 });
    fireEvent.pointerMove(grid, { pointerId: 0, clientX: 20, clientY: 20 });

    expect(store.getState().viewTransform)
      .toStrictEqual([
        [ 1, 0, 20 ], 
        [ 0, 1, 20 ],
        [ 0, 0,  1 ]
      ]);
  });

  it("Only follows first pointer that goes down.", () =>
  {
    const store = createStore(combineReducers({ viewTransform }));

    const { getByTestId } = renderSVG(
      <Provider store={store}>
        <Grid patternId={null} />
      </Provider>
    );

    const grid = getByTestId(gridTestId);

    fireEvent.pointerDown(grid, { pointerId: 0 });
    fireEvent.pointerDown(grid, { pointerId: 1 })
    fireEvent.pointerMove(grid, { pointerId: 0, clientX: 10, clientY: 10 });

    expect(store.getState().viewTransform)
      .toStrictEqual([
        [ 1, 0, 10 ],
        [ 0, 1, 10 ],
        [ 0, 0,  1 ]
      ]);
  });

  // I want to test pointer capture, but due to limitations in how JSDOM is
  // developed, they do not support setPointerCapture.
});