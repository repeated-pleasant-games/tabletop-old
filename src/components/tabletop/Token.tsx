import * as React from "react";

export const tokenTestId = "token";

export const Token = (): any => (
  <circle data-testid={tokenTestId} />
);

export default Token;