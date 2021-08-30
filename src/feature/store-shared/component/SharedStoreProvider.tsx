import React from "react";
import createContext from "zustand/context";
import { DocumentProvider, useAwareness, useDoc, useWebRtc } from "@joebobmiles/y-react";

import { v4 as uuidv4 } from "uuid";

import { SharedState, createSharedStore, createUserName } from "../util";
import { useLocalStore } from "@/hook/useLocalStore";
import { apply, inverseOf } from "@/lib/Transform";

const { Provider, useStore, useStoreApi } = createContext<SharedState>();

export { useStore as useSharedStore, useStoreApi as useSharedStoreApi };

type SharedStoreProviderProps = React.HTMLAttributes<{}> &
{
  room: string,
};

const InnerSharedStoreProvider = ({
  room,
  children
}: SharedStoreProviderProps = {
  room: uuidv4()
}) =>
{
  const doc = useDoc();
  const provider = useWebRtc(room);

  const { setLocalState } = useAwareness(provider.awareness);
  const viewTransform = useLocalStore(({ viewTransform }) => viewTransform)

  const userName = React.useMemo(
    () => createUserName(),
    []
  );

  React.useEffect(
    () =>
    {
      const updateUserPointerPosition = (event: PointerEvent) =>
      {
        const [ x, y ] = apply(inverseOf(viewTransform), [ event.clientX, event.clientY ])

        setLocalState((prevState) =>
        ({
          ...prevState,
          x,
          y,
        }))
      };

      window.addEventListener("pointermove", updateUserPointerPosition);

      setLocalState({
        userName,
        x: 0,
        y: 0,
      })

      return () =>
      {
        window.removeEventListener("pointermove", updateUserPointerPosition);
      }
    },
    [viewTransform]
  )

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

export const SharedStoreProvider = ({
  room,
  children
}: SharedStoreProviderProps = {
  room: uuidv4()
}) =>
(
  <DocumentProvider>
    <InnerSharedStoreProvider room={room}>
      {children}
    </InnerSharedStoreProvider>
  </DocumentProvider>
)