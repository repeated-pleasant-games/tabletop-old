
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

export const transformX =
{
  get: (
      [
        [  ,  , x ],
        ...rest
      ]: Transform
    ) => x,
  set: (
      [
        [ a, b, _ ],
        ...rest
      ]: Transform,
      newX: number
    ): Transform => (
      [
        [ a, b, newX ],
        ...rest
      ]
    ),
};

export const transformToSvgString = (
  [
    [ a, b, x ],
    [ c, d, y ],
    [  ,  ,   ]
  ]: Transform
): string =>
  `matrix(${a},${b},${c},${d},${x},${y})`;