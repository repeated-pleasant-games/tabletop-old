import * as React from "react"

import { useLocalStore } from "@/hook/useLocalStore";
import { SharedStoreProvider } from "@/context/SharedStore";

import { RectangularGrid, } from "@/feature/grid";
import { Tabletop, } from "@/feature/tabletop";
import { ControlPanel, } from "@/feature/control-panel";
import { JoinForm, } from "@/feature/room";
import { Container, Heading } from "@chakra-ui/react";
import { DocumentProvider } from "@joebobmiles/y-react";

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
          <Container centerContent>
            <Heading marginBottom={4}>Welcome, Adventurer</Heading>
            <JoinForm />
          </Container>
        )
        : (
          <DocumentProvider>
            <SharedStoreProvider room={room}>
              <ControlPanel />
              <Tabletop grid={<RectangularGrid />} />
            </SharedStoreProvider>
          </DocumentProvider>
        )
      }
    </main>
  )
}

export default App;