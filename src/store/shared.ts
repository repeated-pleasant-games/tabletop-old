import create from "zustand";
import yjs from "zustand-middleware-yjs";

import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

import { Actor } from "~/core/Actor";

type SharedState =
{
  actors: Actor[],
  addActor: (actor: Actor) => void,
  removeActor: (actorId: string) => void,
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
          )
    })
  )
);