import * as React from "react";

type GridProps = React.HTMLAttributes<{}> &
{
  pattern: React.ReactElement
}

export const Grid = ({ pattern }: GridProps) => (
  <>
    {pattern}
    <rect data-testid="grid-rect" />
  </>
);