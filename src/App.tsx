import * as React from "react"

import { useLocalStore } from "@/hook/useLocalStore";
import { SharedStore } from "@/context/SharedStore";

import Tabletop from "~/components/tabletop/Tabletop";
import { RectangularGrid } from "~/components/tabletop/RectangularGrid";

import ControlPanel from "~/components/control-panel/ControlPanel";
import JoinForm from "~/components/join-form/JoinForm";

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
          <SharedStore room={room}>
            <ControlPanel />
            <Tabletop grid={<RectangularGrid />} />
          </SharedStore>
        )
      }
    </main>
  )
}

export default App;