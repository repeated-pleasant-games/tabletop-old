import React from "react";
import { useSharedStore } from "~/store/shared";

export const actorListTestId = "actor-list";
export const actorListItemTestId = "actor-list-item";

export const ActorList = () =>
{
  const { actors, removeActor } = useSharedStore(({ actors, removeActor }) =>
  ({
    actors,
    removeActor,
  }));

  return (
    <>
      <span style={{ display: "block" }}>Actors:</span>
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
};

export default ActorList;