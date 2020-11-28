import * as React from "react";

type GridProps = React.HTMLAttributes<{}> &
{
  patternId: string,
}

export const Grid = ({ patternId }: GridProps) => (
  <rect
    data-testid="grid-rect"
    width="100%"
    height="100%"
    fill={`url(#${patternId})`}
  />
);