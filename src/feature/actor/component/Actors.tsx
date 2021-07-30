import { useSharedStore } from "@/hook/useSharedStore";
import { Token } from "@/feature/tabletop";
import React from "react";

export const Actors = (): any => 
{
  const { actors, setActorPosition } = useSharedStore(
    ({ actors, setActorPosition }) =>
    ({
      actors,
      setActorPosition
    })
  );

  return (
    <>
      {
        (!actors || actors.length === 0)
        ? null
        : actors.map(
          (actor) =>
          (
            <Token
              key={actor.id}

              x={actor.x}
              y={actor.y}

              label={actor.name}

              setPosition={
                (x, y) => setActorPosition(actor.id, x, y)
              }

              cellSize={16}
            />
          )
        )
      }
    </>
  );
};