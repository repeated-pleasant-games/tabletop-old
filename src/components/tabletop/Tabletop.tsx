import * as React from "react";

type TabletopProps = React.HTMLAttributes<{}> &
{
  gridComponent: JSX.Element
};

export const Tabletop = ({ gridComponent }: TabletopProps) => (
  <svg id="tabletop">
    {gridComponent}
  </svg>
);