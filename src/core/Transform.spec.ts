import {
  apply,
  identityTransform,
  Transform,
  toSvgMatrix,
  translateBy,
  translation
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

describe("translateBy", () =>
{
  it("Increments translation by given dx and dy pair", () =>
  {
    const original: Transform = [
      [ 1, 0, 0 ],
      [ 0, 1, 0 ],
      [ 0, 0, 1 ],
    ];

    const firstTranslation: Transform = translateBy([ 10, 20 ], original);

    expect(firstTranslation).toStrictEqual([
        [ 1, 0, 10 ],
        [ 0, 1, 20 ],
        [ 0, 0,  1 ],
      ]);

    const secondTranslation: Transform = translateBy([ 4, 5 ], firstTranslation);

    expect(secondTranslation).toStrictEqual([
        [ 1, 0, 14 ],
        [ 0, 1, 25 ],
        [ 0, 0,  1 ],
    ])
  });
});

describe("translation", () =>
{
  it("Creates a new transform matrix with the x and y fields set.", () =>
  {
    expect(translation(3, 5)).toStrictEqual([
      [ 1, 0, 3 ],
      [ 0, 1, 5 ],
      [ 0, 0, 1 ],
    ]);
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