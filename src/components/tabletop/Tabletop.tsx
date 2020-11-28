import * as React from "react";

type TabletopProps = React.HTMLAttributes<{}> &
{
  grid: React.ReactElement,
};

export const Tabletop = ({ grid }: TabletopProps) =>
(
  <svg id="tabletop">
    {grid}
  </svg>
);