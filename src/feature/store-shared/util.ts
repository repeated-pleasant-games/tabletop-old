import create from "zustand";
import yjs from "zustand-middleware-yjs";

import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

import { ActorState, createActorState } from "@/feature/actor";

export type SharedState = ActorState;

export const createSharedStore = (doc: Y.Doc) =>
  create<SharedState>(
    yjs(
      doc,
      "shared-state",
      (set) =>
      ({
        ...createActorState(set),
      })
    )
  );