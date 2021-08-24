import React from "react";
import createContext from "zustand/context";
import { useDoc, useWebRtc } from "@joebobmiles/y-react";

import { v4 as uuidv4 } from "uuid";

import { SharedState, createSharedStore } from "../util";

const { Provider, useStore, useStoreApi } = createContext<SharedState>();

export { useStore as useSharedStore, useStoreApi as useSharedStoreApi };

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
  const doc = useDoc();
  useWebRtc(room);

  const createStore = React.useCallback(
    () => createSharedStore(doc),
    [ doc, room ]
  );

  return (
    <Provider createStore={createStore}>
      {children}
    </Provider>
  );
}