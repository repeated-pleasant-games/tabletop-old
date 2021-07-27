import React from "react";
import create from "zustand";
import yjs from "zustand-middleware-yjs";

import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

import { v4 as uuidv4 } from "uuid";

import { Actor } from "@/lib/Actor";

export type SharedState =
{
  actors: Actor[],
  addActor: (actor: Actor) => void,
  removeActor: (actorId: string) => void,
  setActorPosition: (actorId: string, x: number, y: number) => void,
};

const useSharedStoreFactory = (roomName: string) =>
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

const SharedStoreContext = React.createContext(
  useSharedStoreFactory(uuidv4())
);

export const useUseSharedStore = () => React.useContext(SharedStoreContext);

type SharedStoreProps = React.HTMLAttributes<{}> &
{
  room: string
};

export const SharedStore = ({
  room,
  children,
}: SharedStoreProps =
{
  room: uuidv4()
}) =>
{
  const useSharedStore = React.useMemo(
    () =>
      useSharedStoreFactory(room),
    [ room ]
  );

  return (
    <SharedStoreContext.Provider value={useSharedStore}>
      {children}
    </SharedStoreContext.Provider>
  );
};
