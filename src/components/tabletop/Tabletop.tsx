import * as React from "react";
import { connect } from "react-redux";
import { Actor } from "~/core/Actor";
import Token from "./Token";

type TabletopProps = React.HTMLAttributes<{}> &
{
  grid: React.ReactElement,
  actors?: Actor[]
};

export const Tabletop = ({ grid, actors }: TabletopProps) =>
(
  <svg id="tabletop">
    {grid}
    <g>
      {
        actors &&
        actors.map(
          (actor) =>
          (
            <Token key={actor.id} x={actor.x} y={actor.y} cellSize={16} />
          )
        )
      }
    </g>
  </svg>
);

const stateToProps = ({ actors }: { actors: Actor[] }) =>
({
  actors 
});

export default connect(stateToProps)(Tabletop);