import create from "zustand";
import yjs from "zustand-middleware-yjs";

import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

import { Actor } from "~/core/Actor";

export type SharedState =
{
  actors: Actor[],
  addActor: (actor: Actor) => void,
  removeActor: (actorId: string) => void,
  setActorPosition: (actorId: string, x: number, y: number) => void,
};

const doc = new Y.Doc();
new WebrtcProvider("repeated-pleasant-games", doc);

export const useSharedStore = create<SharedState>(
  yjs(
    doc,
    "shared-state",
    (set) =>
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
    })
  )
);

export const useSharedStoreFactory = (roomName: string) =>
{
  const doc = new Y.Doc();
  new WebrtcProvider(roomName, doc);

  return create<SharedState>(
    yjs(
      doc,
      "shared-state",
      (set) =>
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
      })
    )
  );
};