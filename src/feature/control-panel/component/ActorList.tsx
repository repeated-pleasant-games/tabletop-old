import React from "react";
import { useUseSharedStore } from "@/context/SharedStore";

import "./ActorList.module.css";
import styles from "./ActorList.module.css";

export const actorListTestId = "actor-list";
export const actorListItemTestId = "actor-list-item";

export const ActorList = () =>
{
  const useSharedStore = useUseSharedStore();

  const { actors, removeActor } = useSharedStore(({ actors, removeActor }) =>
  ({
    actors,
    removeActor,
  }));

  if (actors.length === 0)
  {
    return (
      <span className={styles["no-actors"]}>...No actors...</span>
    );
  }
  else
  {
    return (
      <>
        <span>Actors:</span>
        <ul data-testid={actorListTestId}>
          {
            actors &&
            actors
            .sort(
              (a, b) => Math.sign(b.initiative - a.initiative)
            )
            .map(
              (actor) =>
              <li
                key={actor.id}
                data-testid={actorListItemTestId}
                onClick={() => removeActor(actor.id)}
              >
                {actor.name}
              </li>
            )
          }
        </ul>
      </>
    );
  }
};

export default ActorList;