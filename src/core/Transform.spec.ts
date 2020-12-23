import {
  apply,
  identityTransform,
  Transform,
  toSvgMatrix,
  xOffset,
  translateBy
} from "./Transform";

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
      toSvgMatrix([
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
      xOffset.get([
          [ 1, 2, 3 ],
          [ 4, 5, 6 ],
          [ 7, 8, 9 ]
        ]))
      .toBe(3);
  });

  it("Replaces x value from transform with new x.", () =>
  {
    expect(
      xOffset.set(
        10,
        [
          [ 1, 2, 3 ],
          [ 4, 5, 6 ],
          [ 7, 8, 9 ]
        ]))
      .toStrictEqual([
        [ 1, 2, 10 ],
        [ 4, 5, 6 ],
        [ 7, 8, 9 ]
      ]);
  });
});

describe("translateBy", () =>
{
  it("Increments translation by given dx and dy pair", () =>
  {
    const original: Transform = [
      [ 1, 0, 0 ],
      [ 0, 1, 0 ],
      [ 0, 0, 1 ],
    ];

    const firstTranslation: Transform = translateBy(original, [ 10, 20 ]);

    expect(firstTranslation).toStrictEqual([
        [ 1, 0, 10 ],
        [ 0, 1, 20 ],
        [ 0, 0,  1 ],
      ]);

    const secondTranslation: Transform = translateBy(firstTranslation, [ 4, 5 ]);

    expect(secondTranslation).toStrictEqual([
        [ 1, 0, 14 ],
        [ 0, 1, 25 ],
        [ 0, 0,  1 ],
    ])
  });
});

describe("apply", () =>
{
  it("Multiplies two transforms together", () =>
  {
    const transformOne: Transform = [
      [ 1, 0, 5 ],
      [ 0, 1, 5 ],
      [ 0, 0, 1 ],
    ];

    const transformTwo: Transform = [
      [ 1, 2, 3 ],
      [ 4, 5, 6 ],
      [ 7, 8, 1 ]
    ];

    expect(apply(transformOne, transformTwo))
      .toStrictEqual([
        [ 36, 42,  8 ],
        [ 39, 45, 11 ],
        [  7,  8,  1 ]
      ]);

    expect(apply(transformTwo, transformOne))
      .toStrictEqual([
        [ 1, 2, 18 ],
        [ 4, 5, 51 ],
        [ 7, 8, 76 ]
      ])
  });
});