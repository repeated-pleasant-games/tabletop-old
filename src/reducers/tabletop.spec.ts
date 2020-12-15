import { SetViewTransformPayload } from "~/actions/tabletop";
import { viewTransform } from "./tabletop";

describe("viewTransform reducer", () =>
{
  it("Returns the default state when state is undefined and action is null.", () =>
  {
    expect(viewTransform(undefined, <SetViewTransformPayload>{}))
      .toEqual([ 1, 0, 0, 1, 0, 0 ]);
  });

  it("Returns the transform that was passed when state is defined.", () =>
  {
    expect(viewTransform(
      [ 1, 0, 0, 1, 0, 0 ],
      {
        type: "set view transform",
        viewTransform: [ 1, 0, 0, 1, 2, 3 ],
      }))
      .toEqual([ 1, 0, 0, 1, 2, 3 ]);
  });

  it("Returns the transform that was passed when state is undefined.", () =>
  {
    expect(viewTransform(
      undefined,
      {
        type: "set view transform",
        viewTransform: [ 1, 0, 0, 1, 2, 3 ],
      }))
      .toEqual([ 1, 0, 0, 1, 2, 3 ]);
  });
});