import * as React from "react"
import { v4 as uuidv4 } from "uuid";

import { useLocalStore } from "./store/local";
import { useSharedStoreFactory } from "./store/shared";

import Tabletop from "~/components/tabletop/Tabletop";
import { RectangularGrid } from "~/components/tabletop/RectangularGrid";

import ControlPanel from "./components/control-panel/ControlPanel";
import JoinForm from "./components/join-form/JoinForm";

export const SharedStoreContext = React.createContext(
  useSharedStoreFactory(uuidv4())
);

export const App = () =>
{
  const { room } = useLocalStore();

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      {
        room === ""
        ? (
          <JoinForm />
        )
        : (
          <SharedStoreContext.Provider value={useSharedStoreFactory(room)}>
            <ControlPanel />
            <Tabletop grid={<RectangularGrid />} />
          </SharedStoreContext.Provider>
        )
      }
    </main>
  )
}

export default App;