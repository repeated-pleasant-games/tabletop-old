import * as React from "react";

export const tokenTestId = "token";

type TokenProps =
{
  x: number,
  y: number,
  cellSize: number,
}

export const Token = ({ x, y, cellSize }: TokenProps): any =>
(
  <rect
    data-testid={tokenTestId}
    x={x}
    y={y}
    width={cellSize}
    height={cellSize}
  />
);

export default Token;