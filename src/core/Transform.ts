
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
    [  ,  ,   ]
  ]: Transform
): string =>
  `matrix(${a},${b},${c},${d},${x},${y})`;

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

export const transformY =
{
  get: (
      [
        [  ,  ,   ],
        [  ,  , y ],
        [  ,  ,   ]
      ]: Transform
    ) => y,
  set: (
      [
        firstRow,
        [ c, d, y ],
        lastRow
      ]: Transform,
      newY: number
    ): Transform => (
      [
        firstRow,
        [ c, d, newY ],
        lastRow
      ]
    ),
};

export const transformTranslation =
{
  get: (
      [
        [  ,  , x ],
        [  ,  , y ],
        [  ,  ,   ]
      ]: Transform
    ): [ number, number ] =>
      [ x, y ],
  set: (
      [
        [ a, b,   ],
        [ c, d,   ],
        lastRow
      ]: Transform,
      [ newX, newY ]: [ number, number ]
    ): Transform =>
    (
      [
        [ a, b, newX ],
        [ c, d, newY ],
        lastRow
      ]
    ),
};
