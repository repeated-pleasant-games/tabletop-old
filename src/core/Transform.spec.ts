import { identityTransform, transformToSvgString, transformX, transformY } from "./Transform";

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

describe("transformX lens", () =>
{
  it("Retrieves x value from transform.", () =>
  {
    expect(
      transformX.get([
          [ 1, 2, 3 ],
          [ 4, 5, 6 ],
          [ 7, 8, 9 ]
        ]))
      .toBe(3);
  });

  it("Replaces x value from transform with new x.", () =>
  {
    expect(
      transformX.set([
          [ 1, 2, 3 ],
          [ 4, 5, 6 ],
          [ 7, 8, 9 ]
        ],
        10))
      .toStrictEqual([
        [ 1, 2, 10 ],
        [ 4, 5, 6 ],
        [ 7, 8, 9 ]
      ]);
  });
});

describe("transformY lens", () =>
{
  it("Retrieves y value from transform.", () =>
  {
    expect(
      transformY.get([
          [ 1, 2, 3 ],
          [ 4, 5, 6 ],
          [ 7, 8, 9 ]
        ]))
      .toBe(6);
  });

  it("Replaces y value from transform with new y.", () =>
  {
    expect(
      transformY.set([
          [ 1, 2, 3 ],
          [ 4, 5, 6 ],
          [ 7, 8, 9 ]
        ],
        10))
      .toStrictEqual([
        [ 1, 2, 3 ],
        [ 4, 5, 10 ],
        [ 7, 8, 9 ]
      ]);
  });
});

describe("translate", () =>
{
  it("Only adjusts x and y values.", () =>
  {
    // TODO
  });
});