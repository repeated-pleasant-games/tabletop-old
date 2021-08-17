import create from "zustand";
import yjs from "zustand-middleware-yjs";

import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

import { ActorState, createActorState } from "@/feature/actor";
import {
  createThingAttributeSystemState,
  ThingAttributeSystemState
} from "@/feature/thing-attribute-system";

export type SharedState = ActorState & ThingAttributeSystemState;

export const createSharedStore = (roomName: string) =>
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
        ...createThingAttributeSystemState(set),
      })
    )
  );
};