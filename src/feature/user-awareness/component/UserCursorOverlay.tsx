import React from "react"

import { useAwareness, useWebRtc } from "@joebobmiles/y-react"
import { useLocalStore } from "@/feature/store-local";
import { apply } from "@/lib/Transform";

import { Cursor } from "./Cursor";

export const UserCursorOverlay = () =>
{
  const { room, viewTransform } = useLocalStore(
    ({ room, viewTransform }) => ({ room, viewTransform })
  );

  const provider = useWebRtc(room);
  const { states, localID } = useAwareness(provider.awareness);


  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        padding: 0,
        margin: 0,
        pointerEvents: "none"
      }}
    >
      {
        Array.from(states.entries())
        .filter(([id]) => id !== localID)
        .map(
          ([id, state]) =>
          {
            const [ x, y ] = apply(viewTransform, [ state.x, state.y ])
            return (<Cursor key={id} x={x} y={y} name={state.userName} />);
          }
        )
      }
    </svg>
  );
}