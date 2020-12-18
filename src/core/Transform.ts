
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

export const transformToSvgString = (
  [
    [ a, b, x ],
    [ c, d, y ],
    [  ,  ,   ],
  ]: Transform
): string =>
  `matrix(${a},${b},${c},${d},${x},${y})`;