import * as React from "react";
import { SharedStoreContext } from "~/App";

import Token from "./Token";

type TabletopProps = React.HTMLAttributes<{}> &
{
  grid: React.ReactElement,
};
export const Tabletop = ({ grid, }: TabletopProps) =>
{
  const useSharedStore = React.useContext(SharedStoreContext);

  const {
    actors,
    setActorPosition
  } = useSharedStore((state) =>
  ({
    actors: state.actors,
    setActorPosition: state.setActorPosition,
  }));

  return (
    <svg id="tabletop">
      {grid}
      <g>
        {
          actors &&
          actors.map(
            (actor) =>
            (
              <Token
                key={actor.id}
                x={actor.x}
                y={actor.y}
                setPosition={(x, y) => setActorPosition(actor.id, x, y)}
                cellSize={16}
              />
            )
          )
        }
      </g>
    </svg>
  );
}

export default Tabletop;