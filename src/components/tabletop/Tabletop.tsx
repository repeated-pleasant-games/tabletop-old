import * as React from "react";
import Token from "./Token";

type TabletopProps = React.HTMLAttributes<{}> &
{
  grid: React.ReactElement,
};

export const Tabletop = ({ grid }: TabletopProps) =>
(
  <svg id="tabletop">
    {grid}
    <Token x={0} y={0} cellSize={16} />
  </svg>
);