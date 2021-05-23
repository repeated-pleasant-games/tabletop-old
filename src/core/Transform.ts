
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

export const translateBy = (
  [ dx, dy ]: [ number, number ],
  transform: Transform
) =>
  composeTransforms(
    translation(dx, dy),
    transform);

export const translation = (dx: number, dy: number): Transform =>
  ([
    [ 1, 0, dx ],
    [ 0, 1, dy ],
    [ 0, 0,  1 ],
  ]);

export const scaleBy = (factor: number, transform: Transform) =>
  composeTransforms(
    scale(factor),
    transform
  );

export const scale = (factor: number): Transform =>
  ([
    [ factor,      0, 0 ],
    [      0, factor, 0 ],
    [      0,      0, 1 ],
  ]);

export const getScale = (
  [
    [ scaleX,       , ],
    [       , scaleY, ],
    [       ,       , ]
  ]: Transform
) =>
  ([ scaleX, scaleY ])

/**
 * Applies the first transform to the second by performing matrix multiplication.
 * @param a The transform to apply.
 * @param b The transform to apply to.
 */
export const composeTransforms = (
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

export type Transformer = (_: Transform) => Transform;

export const transformerOf = (a: Transform): Transformer =>
  (b: Transform) =>
    composeTransforms(a, b);

export const apply = (
  [
    [ t_11, t_12, t_13 ],
    [ t_21, t_22, t_23 ],
  ]: Transform,
  [ x, y ]: [ number, number ]
): [ number, number ] =>
  ([
    t_11*x + t_12*y + t_13,
    t_21*x + t_22*y + t_23,
  ]);

export const determinantOf = (
  [
    [ a, b, c ],
    [ d, e, f ],
    [ g, h, i ],
  ]: Transform
): number =>
  (
    // Source: https://en.wikipedia.org/wiki/Determinant
    (a*e*i) + (b*f*g) + (c*d*h) - (c*e*g) - (b*d*i) - (a*f*h)
  );

export const inverseOf = (t: Transform): Transform =>
{
  const det = determinantOf(t);

  if (det === 0) throw new Error("Transform cannot be inverted.");

  const [
    [ a, b, c ],
    [ d, e, f ],
    [ g, h, i ],
  ] = t;

  return [
    [ 
      (e*i - f*h) / det,
      -1 * (b*i - c*h) / det,
      (b*f - c*e) / det
    ],
    [
      -1 * (d*i - f*g) / det,
      (a*i - c*g) / det,
      -1 * (a*f - c*d) / det
    ],
    [  (d*h - e*g) / det, -1 * (a*h - b*g) / det,  (a*e - b*d) / det ],
  ]
};

export const negationOf = ([
  [ sx,   , x ],
  [   , sy, y ],
]: Transform): Transform =>
  ([
    // We check to see if x and y are zero because, for some reason, JavaScript
    // considers 0 and -0 to be different values.
    [ 1/sx,    0, x == 0 ? 0 : -(x) ],
    [    0, 1/sy, y == 0 ? 0 : -(y) ],
    [    0,    0,                 1 ],
  ]);