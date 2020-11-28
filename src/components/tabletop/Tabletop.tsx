import * as React from "react";

type TabletopProps = React.HTMLAttributes<{}> &
{
  grid: JSX.Element
};

export const Tabletop = ({ grid }: TabletopProps) =>
(
  <svg id="tabletop">
    {grid}
  </svg>
);