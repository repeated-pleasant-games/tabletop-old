import * as React from "react"

import { useLocalStore } from "@/hook/useLocalStore";
import { SharedStoreProvider } from "@/context/SharedStore";

import { Tabletop, RectangularGrid, } from "@/feature/tabletop";
import { ControlPanel, } from "@/feature/control-panel";
import { JoinForm } from "@/feature/room";

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
          <SharedStoreProvider room={room}>
            <ControlPanel />
            <Tabletop grid={<RectangularGrid />} />
          </SharedStoreProvider>
        )
      }
    </main>
  )
}

export default App;