import React from "react";

import { v4 as uuid } from "uuid";

import { useUseSharedStore } from "@/context/SharedStore";
import { Button } from "@/component/Button";

export const ActorPanel = (): any =>
{
  const useSharedStore = useUseSharedStore();

  const { actors, addActor, removeActor } = useSharedStore();

  return (
    <>
      <Button
        onClick={() =>
          addActor({
            id: uuid(),
            name: "Actor",
            initiative: 0,
            x: 0,
            y: 0,
          })
        }
      >
        Add Actor
      </Button>
      {
        actors.length === 0
        ? (
          <p>... No actors ...</p>
        )
        : (
          <ul>
            {
              actors.map((actor) =>
                (
                  <li
                    key={actor.id}
                    onClick={() => removeActor(actor.id)}
                  >
                    {actor.name}
                  </li>
                )
              )
            }
          </ul>
        )
      }
    </>
  );
};

export default ActorPanel;