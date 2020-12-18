import { identityTransform, transformToSvgString } from "./Transform";

describe("identityTransform", () =>
{
  it("Produces the identity matrix", () =>
  {
    expect(identityTransform()).toStrictEqual(
      [
        [ 1, 0, 0 ],
        [ 0, 1, 0 ],
        [ 0, 0, 1 ]
      ]);
  });
});

describe("transformToSvgString", () =>
{
  it("Converts transform to SVG transform matrix", () =>
  {
    expect(
      transformToSvgString([
        [ 1, 2, 3 ],
        [ 4, 5, 6 ],
        [ 7, 8, 9 ]
      ]))
      .toBe("matrix(1,2,4,5,3,6)");
  });
});