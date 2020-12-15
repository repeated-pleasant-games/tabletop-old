import { setViewTransform } from "./tabletop";

describe("Action setViewTransform", () =>
{
  it("Returns a payload with 'type' of 'set view transform'", () =>
  {
    expect(setViewTransform(0, 0).type).toBe("set view transform");
  });

  it("Returns a payload whose view transform has the given x and y values.", () =>
  {
    expect(setViewTransform(10, 2).viewTransform)
      .toStrictEqual([ 1, 0, 0, 1, 10, 2 ]);
  });
});