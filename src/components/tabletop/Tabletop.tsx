import * as React from "react";

type TabletopProps = React.HTMLAttributes<{}> &
{
  grid: React.ReactElement,
};

export const Tabletop = ({ grid, children }: TabletopProps) =>
(
  <svg id="tabletop">
    {grid}
    {children}
  </svg>
);