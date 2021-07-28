import * as React from "react";

import { Actors } from "@/feature/actor";

type TabletopProps = React.HTMLAttributes<{}> &
{
  grid: React.ReactElement,
};
export const Tabletop = ({ grid, }: TabletopProps) =>
(
  <svg id="tabletop">
    {grid}
    <Actors />
  </svg>
);

export default Tabletop;