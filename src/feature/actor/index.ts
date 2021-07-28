import { SetState } from "zustand";
import { Actor } from "./type/Actor";

export * from "./type/Actor";
export * from "./component/ActorPanel";

export type ActorState =
{
  actors: Actor[],
  addActor: (actor: Actor) => void,
  removeActor: (actorId: string) => void,
  setActorPosition: (actorId: string, x: number, y: number) => void,
};

export const createActorState = (set: SetState<ActorState>): ActorState =>
({
  actors: [],
  addActor:
    (actor: Actor) =>
      set((state) => ({ actors: [ ...state.actors, actor ] })),
  removeActor:
    (actorId: string) =>
      set(
        (state) =>
        ({
          actors: state.actors.filter(({ id }) => id !== actorId)
        })
      ),
  setActorPosition:
    (actorId: string, x: number, y: number) =>
      set(
        (state) =>
        ({
          actors: state.actors.map(
            (actor) =>
            {
              if (actor.id === actorId)
                return {
                  ...actor,
                  x,
                  y,
                };

              else
                return actor;
            }
          )
        })
      )
});