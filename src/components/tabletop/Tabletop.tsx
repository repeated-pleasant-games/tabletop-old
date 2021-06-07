import * as React from "react";
import { connect } from "react-redux";
import Token from "./Token";

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

export default connect()(Tabletop);