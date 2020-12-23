import {
  identityTransform,
  Transform,
  toSvgMatrix,
  transformTranslation,
  transformX,
  transformY,
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

describe("transformTranslation lens", () =>
{
  it("Retrieves x and y pair from transform.", () =>
  {
    expect(
      transformTranslation.get([
        [ 1, 2, 3 ],
        [ 4, 5, 6 ],
        [ 7, 8, 9 ],
      ]))
      .toStrictEqual([ 3, 6 ]);
  });

  it("Replaces x and y value pair with new x and y value pair.", () =>
  {
    expect(
      transformTranslation.set([
            [ 1, 2, 3 ],
            [ 4, 5, 6 ],
            [ 7, 8, 9 ]
          ],
          [ 10, 11 ]))
        .toStrictEqual([
            [ 1, 2, 10 ],
            [ 4, 5, 11 ],
            [ 7, 8,  9 ]
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