import * as React from "react";
import { fireEvent } from "@testing-library/react";
import { renderSVG } from "~/test-utilities";

import "@testing-library/jest-dom/extend-expect";
import "~/pointer-event";

import Grid, { Grid as DisconnectedGrid, gridTestId } from "./Grid";
import { identityTransform, Transform } from "~/core/Transform";
import { useLocalStore } from "~/store/local";

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
    useLocalStore.getState().setViewTransform(identityTransform());

    const { getByTestId } = renderSVG(<Grid patternId={null} />);

    const grid = getByTestId(gridTestId);
    const pointerId = 0;

    fireEvent.pointerDown(grid, { pointerId, clientX: 0, clientY: 0 });
    fireEvent.pointerMove(
      grid,
      { pointerId, clientX: 10, clientY: 13 });

    expect(useLocalStore.getState().viewTransform)
      .toStrictEqual([
        [ 1, 0, 10 ],
        [ 0, 1, 13 ],
        [ 0, 0,  1 ]
      ]);
  });

  it("Translates the view relative to the current transform.", () =>
  {
    useLocalStore.getState().setViewTransform(
      [
        [ 1, 0, 2 ],
        [ 0, 1, 2 ],
        [ 0, 0, 1 ]
      ]
    );

    const { getByTestId } = renderSVG(<Grid patternId={null} />);

    const grid = getByTestId(gridTestId);
    const pointerId = 0;

    fireEvent.pointerDown(grid, { pointerId });
    fireEvent.pointerMove(
      grid,
      { pointerId, clientX: 10, clientY: 13 });

    expect(useLocalStore.getState().viewTransform)
      .toStrictEqual(
        [
          [ 1, 0, 12 ],
          [ 0, 1, 15 ],
          [ 0, 0,  1 ]
        ]);
  });

  it("Does not change view transform when user only drags.", () =>
  {
    useLocalStore.getState().setViewTransform(identityTransform());

    const { getByTestId } = renderSVG(<Grid patternId={null} />);

    const grid = getByTestId(gridTestId);

    fireEvent.pointerMove(
      grid,
      { clientX: 10, clientY: 13 });

    expect(useLocalStore.getState().viewTransform)
      .toStrictEqual([
        [ 1, 0, 0 ],
        [ 0, 1, 0 ],
        [ 0, 0, 1 ],
      ]);
  });

  it("Does not change the view transform after the user releases the mouse", () =>
  {
    useLocalStore.getState().setViewTransform(identityTransform());

    const { getByTestId } = renderSVG(<Grid patternId={null} />);

    const grid = getByTestId(gridTestId);

    fireEvent.pointerDown(grid, { pointerId: 0 });
    fireEvent.pointerMove(grid, { pointerId: 0, clientX: 10, clientY: 10 });
    fireEvent.pointerUp(grid, { pointerId: 0 });
    fireEvent.pointerMove(grid, { pointerId: 0, clientX: 0, clientY: 0 });

    expect(useLocalStore.getState().viewTransform)
      .toStrictEqual([
        [ 1, 0, 10 ],
        [ 0, 1, 10 ],
        [ 0, 0,  1 ],
      ]);
  });

  it("Does not stop updating view transform when another pointer goes up.", () =>
  {
    useLocalStore.getState().setViewTransform(identityTransform());

    const { getByTestId } = renderSVG(<Grid patternId={null} />);

    const grid = getByTestId(gridTestId);

    fireEvent.pointerDown(grid, { pointerId: 0 });
    fireEvent.pointerMove(grid, { pointerId: 0, clientX: 10, clientY: 10 });
    fireEvent.pointerUp(grid, { pointerId: 1 });
    fireEvent.pointerMove(grid, { pointerId: 0, clientX: 20, clientY: 20 });

    expect(useLocalStore.getState().viewTransform)
      .toStrictEqual([
        [ 1, 0, 20 ], 
        [ 0, 1, 20 ],
        [ 0, 0,  1 ]
      ]);
  });

  it("Only follows first pointer that goes down.", () =>
  {
    useLocalStore.getState().setViewTransform(identityTransform());

    const { getByTestId } = renderSVG(<Grid patternId={null} />);

    const grid = getByTestId(gridTestId);

    fireEvent.pointerDown(grid, { pointerId: 0 });
    fireEvent.pointerDown(grid, { pointerId: 1 })
    fireEvent.pointerMove(grid, { pointerId: 0, clientX: 10, clientY: 10 });

    expect(useLocalStore.getState().viewTransform)
      .toStrictEqual([
        [ 1, 0, 10 ],
        [ 0, 1, 10 ],
        [ 0, 0,  1 ]
      ]);
  });

  // I want to test pointer capture, but due to limitations in how JSDOM is
  // developed, they do not support setPointerCapture.

  /**
   * We want zooming out to approach, but never reach 0.
   * We want zooming in to continue to infinity.
   * 
   * This means we want a function where taking the limit of x to negative
   * infinity results in an f(x) of infinity and taking the limit of x to
   * positive infinity results in an f(x) of zero.
   */
  it.each([
    // In my firefox browser (Firefox 64-bit 88.0), I get a value of 51 and -51
    // when I scroll the mouse wheel. (up = -51, down = 51)
    [ 
      51,
      [
        [ 1, 0, 0 ],
        [ 0, 1, 0 ],
        [ 0, 0, 1 ],
      ],
      [
        [ 1-0.051,       0, 0 ],
        [       0, 1-0.051, 0 ],
        [       0,       0, 1 ],
      ]
    ],
    [
      -51,
      [
        [ 1, 0, 0 ],
        [ 0, 1, 0 ],
        [ 0, 0, 1 ],
      ],
      [
        [ 1.051,     0, 0 ],
        [     0, 1.051, 0 ],
        [     0,     0, 1 ],
      ]
    ],
    // In my chrome browser (Chrome Canary 64-bit 92.0.4487.0), I get a value of
    // 100 and -100. (up = -100, down = 100)
    [ 
      100,
      [
        [ 1, 0, 0 ],
        [ 0, 1, 0 ],
        [ 0, 0, 1 ],
      ],
      [
        [ 0.9,   0, 0 ],
        [   0, 0.9, 0 ],
        [   0,   0, 1 ],
      ]
    ],
    [
      -100,
      [
        [ 1, 0, 0 ],
        [ 0, 1, 0 ],
        [ 0, 0, 1 ],
      ],
      [
        [ 1.1,   0, 0 ],
        [   0, 1.1, 0 ],
        [   0,   0, 1 ],
      ]
    ],
    // My version of Edge (Edge 64-bit 90.0.818.46) returns the same values as
    // Chrome Canary.
    // ---
    [ 
      50,
      [
        [ 3, 0, 0 ],
        [ 0, 3, 0 ],
        [ 0, 0, 1 ],
      ],
      [
        [ 3-0.05,      0, 0 ],
        [      0, 3-0.05, 0 ],
        [      0,      0, 1 ],
      ]
    ],
    [
      -50,
      [
        [ 3, 0, 0 ],
        [ 0, 3, 0 ],
        [ 0, 0, 1 ],
      ],
      [
        [ 3.05,    0, 0 ],
        [    0, 3.05, 0 ],
        [    0,    0, 1 ],
      ]
    ],
  ])("Zooms when using scroll wheel.", (
    deltaY,
    initialTransform: Transform,
    expectedTransform: Transform
  ) =>
  {
    useLocalStore.getState().setViewTransform(initialTransform);

    const { getByTestId } = renderSVG(<Grid patternId={null} />);

    const grid = getByTestId(gridTestId);

    fireEvent.wheel(grid, { deltaY });

    expect(useLocalStore.getState().viewTransform).toStrictEqual(expectedTransform);
  });

  it("Zooms centered on cursor.", () =>
  {
    const clientX = 10, clientY = 12, deltaY = 100;

    useLocalStore.getState().setViewTransform(identityTransform());

    const { getByTestId } = renderSVG(<Grid patternId={null} />);

    const grid = getByTestId(gridTestId);

    fireEvent.wheel(grid, { deltaY, clientX, clientY });

    expect(useLocalStore.getState().viewTransform)
    .toStrictEqual([
      [ 0.9,   0, (clientX * (1 - 0.9)) ],
      [   0, 0.9, (clientY * (1 - 0.9)) ],
      [   0,   0,                1 ],
    ]);
  });
});