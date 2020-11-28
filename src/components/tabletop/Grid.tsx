import * as React from "react";

type GridProps = React.HTMLAttributes<{}> &
{
  patternId: string,
}

export const gridTestId = "grid-rect";

export const Grid = ({ patternId }: GridProps) => (
  <rect
    data-testid={gridTestId}
    width="100%"
    height="100%"
    fill={ patternId === null ? "none" : `url(#${patternId})` }
  />
);