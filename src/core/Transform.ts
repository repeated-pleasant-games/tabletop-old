
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

export const yOffset =
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
        [ c, d,   ],
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

export const translation =
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

export const translateBy = (
  transform: Transform,
  [ dx, dy ]: [ number, number ]
) =>
{
  const [ x, y ] = translation.get(transform);

  return translation.set(
    transform,
    [ x + dx, y + dy ]);
};