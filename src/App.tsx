import * as React from "react"

import { useLocalStore } from "./store/local";
import { useSharedStoreFactory } from "./store/shared";

import Tabletop from "~/components/tabletop/Tabletop";
import { RectangularGrid } from "~/components/tabletop/RectangularGrid";

import ControlPanel from "./components/control-panel/ControlPanel";
import { Button } from "./components/util/Button";

export const SharedStoreContext = React.createContext(
  useSharedStoreFactory("repeated-pleasant-games")
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
          <section
            style={{
              width: "50%",
            }}
          >
            <input
              type="text"
              placeholder="Room to join"
              style={{ color: "black" }}
            />
            <Button>Join!</Button>
          </section>
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