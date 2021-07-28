import React from "react";
import create from "zustand";
import createContext from "zustand/context";
import yjs from "zustand-middleware-yjs";

import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

import { v4 as uuidv4 } from "uuid";

import { ActorState, createActorState } from "@/feature/actor";

export type SharedState = ActorState;

const createSharedStore = (roomName: string) =>
{
  const doc = new Y.Doc();
  new WebrtcProvider(roomName, doc);

  return create<SharedState>(
    yjs(
      doc,
      "shared-state",
      (set) =>
      ({
        ...createActorState(set),
      })
    )
  );
};

const { Provider, useStore } = createContext<SharedState>();

type SharedStoreProviderProps = React.HTMLAttributes<{}> &
{
  room: string,
};

export const SharedStoreProvider = ({
  room,
  children
}: SharedStoreProviderProps = {
  room: uuidv4()
}) =>
{
  const createStore = React.useCallback(
    () => createSharedStore(room),
    [ room ]
  );

  return (
    <Provider createStore={createStore}>
      {children}
    </Provider>
  );
}

export { useStore as useSharedStore };
