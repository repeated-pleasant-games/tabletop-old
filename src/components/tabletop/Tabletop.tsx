import * as React from "react";
import { Actor } from "~/core/Actor";
import { useSharedStore } from "~/store/shared";
import Token from "./Token";

type TabletopProps = React.HTMLAttributes<{}> &
{
  grid: React.ReactElement,
};

export const Tabletop = ({ grid, }: TabletopProps) =>
{
  const {
    actors,
  } = useSharedStore();

  return (
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
}

export default Tabletop;