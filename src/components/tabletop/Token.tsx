import * as React from "react";

export const tokenTestId = "token";

type TokenProps =
{
  x: number,
  y: number,
  cellSize: number,
}

export const Token = ({ x: _x, y: _y, cellSize }: TokenProps): any =>
{
  const [ [ x, y ], setPosition ] = React.useState([ _x, _y ]);

  return (
    <rect
      data-testid={tokenTestId}

      x={x}
      y={y}
      width={cellSize}
      height={cellSize}

      onPointerMove={
        ({ clientX, clientY }) =>
          setPosition([ clientX, clientY ])
      }
    />
  );
};

export default Token;