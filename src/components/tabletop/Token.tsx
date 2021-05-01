import * as React from "react";

export const tokenTestId = "token";

export const Token = ({ x, y }: { x: number, y: number }): any =>
(
  <rect data-testid={tokenTestId} x={x} y={y} />
);

export default Token;