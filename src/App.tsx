import * as React from "react"

import { useLocalStore } from "@/hook/useLocalStore";
import { SharedStoreProvider } from "@/context/SharedStore";

import { RectangularGrid, } from "@/feature/grid";
import { Tabletop, } from "@/feature/tabletop";
import { ControlPanel, } from "@/feature/control-panel";
import { JoinForm, } from "@/feature/room";
import { Container, Heading } from "@chakra-ui/react";

import { UserCursorOverlay } from "./feature/user-awareness";

export const App = () =>
{
  const room = useLocalStore(({ room }) => room);

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
          <SharedStoreProvider room={room}>
            <UserCursorOverlay />
            <ControlPanel />
            <Tabletop grid={<RectangularGrid />} />
          </SharedStoreProvider>
        )
      }
    </main>
  )
}

export default App;