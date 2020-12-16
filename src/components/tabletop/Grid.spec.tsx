import * as React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { act, fireEvent } from "@testing-library/react";
import { renderSVG } from "~/test-utilities";
import "@testing-library/jest-dom/extend-expect";

import Grid, { Grid as DisconnectedGrid, gridTestId } from "./Grid";
import { viewTransform } from "~/reducers/tabletop";

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

describe("Stateless Grid component", () =>
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
  it("Changes view transform when users clicks and drags.", () =>
  {
    const deltaX = 10, deltaY = 13;

    const store = createStore(combineReducers({ viewTransform }));

    const { getByTestId } = renderSVG(
      <Provider store={store}>
        <Grid patternId={null} />
      </Provider>
    );

    const grid = getByTestId(gridTestId);

    act(() =>
    {
      fireEvent.pointerDown(grid);

      fireEvent.pointerMove(
        grid,
        { clientX: deltaX, clientY: deltaY });
    });

    expect(store.getState().viewTransform)
      .toStrictEqual([ 1, 0, 0, 1, deltaX, deltaY ]);
  });
});