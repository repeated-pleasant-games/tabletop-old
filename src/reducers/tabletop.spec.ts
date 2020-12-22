import { SetViewTransformPayload } from "~/actions/tabletop";
import { viewTransform } from "./tabletop";

describe("viewTransform reducer", () =>
{
  it("Returns the default state when state is undefined and action is null.", () =>
  {
    expect(viewTransform(undefined, <SetViewTransformPayload>{}))
      .toStrictEqual([
        [ 1, 0, 0 ],
        [ 0, 1, 0 ],
        [ 0, 0, 1 ]
      ]);
  });

  it("Returns the transform that was passed when state is defined.", () =>
  {
    expect(viewTransform(
      [
        [ 1, 0, 0 ],
        [ 0, 1, 0 ],
        [ 0, 0, 1 ],
      ],
      {
        type: "set view transform",
        viewTransform: [
          [ 1, 0, 2 ],
          [ 0, 1, 3 ],
          [ 0, 0, 1 ]
        ],
      }))
      .toStrictEqual([
        [ 1, 0, 2 ],
        [ 0, 1, 3 ],
        [ 0, 0, 1 ]
      ]);
  });

  it("Returns the transform that was passed when state is undefined.", () =>
  {
    expect(viewTransform(
      undefined,
      {
        type: "set view transform",
        viewTransform: [
          [ 1, 0, 2 ],
          [ 0, 1, 3 ],
          [ 0, 0, 1 ]
        ],
      }))
      .toStrictEqual([
        [ 1, 0, 2 ],
        [ 0, 1, 3 ],
        [ 0, 0, 1 ]
      ]);
  });
});