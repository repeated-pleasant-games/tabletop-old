
export type Transform = [
  [ number, number, number ],
  [ number, number, number ],
  [ number, number, number ],
];

export const identityTransform = (): Transform =>
([
  [ 1, 0, 0 ],
  [ 0, 1, 0 ],
  [ 0, 0, 1 ],
]);

export const toSvgMatrix = (
  [
    [ a, b, x ],
    [ c, d, y ],

  ]: Transform
): string =>
  `matrix(${a},${b},${c},${d},${x},${y})`;

export const xOffset =
{
  get: (
      [
        [  ,  , x ],
        [  ,  ,   ],
        [  ,  ,   ]
      ]: Transform
    ) => x,
  set: (
      newX: number,
      [
        [ a, b,   ],
        ...rest
      ]: Transform
    ): Transform => (
      [
        [ a, b, newX ],
        ...rest
      ]
    ),
};

export const translateBy = (
  transform: Transform,
  [ dx, dy ]: [ number, number ]
) =>
  apply(
    [
      [ 1, 0, dx ],
      [ 0, 1, dy ],
      [ 0, 0,  1 ]
    ],
    transform);

/**
 * Applies the first transform to the second by performing matrix multiplication.
 * @param a The transform to apply.
 * @param b The transform to apply to.
 */
export const apply = (
  [
    [ a_11, a_12, a_13 ],
    [ a_21, a_22, a_23 ],
    [ a_31, a_32, a_33 ],
  ]: Transform,
  [
    [ b_11, b_12, b_13 ],
    [ b_21, b_22, b_23 ],
    [ b_31, b_32, b_33 ],
  ]: Transform,
): Transform =>
  ([
    [
      (a_11 * b_11) + (a_12 * b_21) + (a_13 * b_31),
      (a_11 * b_12) + (a_12 * b_22) + (a_13 * b_32),
      (a_11 * b_13) + (a_12 * b_23) + (a_13 * b_33)
    ],
    [
      (a_21 * b_11) + (a_22 * b_21) + (a_23 * b_31),
      (a_21 * b_12) + (a_22 * b_22) + (a_23 * b_32),
      (a_21 * b_13) + (a_22 * b_23) + (a_23 * b_33)
    ],
    [
      (a_31 * b_11) + (a_32 * b_21) + (a_33 * b_31),
      (a_31 * b_12) + (a_32 * b_22) + (a_33 * b_32),
      (a_31 * b_13) + (a_32 * b_23) + (a_33 * b_33)
    ],
  ]);