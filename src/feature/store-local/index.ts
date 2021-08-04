import create from "zustand";

import { identityTransform, Transform } from "@/lib/Transform";
import { createGridSnapState, GridSnapState } from "@/feature/grid-snap";
import { createRoomState, RoomState } from "@/feature/room";

export type LocalState = GridSnapState & RoomState &
{
  viewTransform: Transform,
  setViewTransform: (viewTransform: Transform) => void,
};

export const useLocalStore = create<LocalState>(
  (set) =>
  ({
    ...createGridSnapState(set),
    ...createRoomState(set),

    viewTransform: identityTransform(),
    setViewTransform:
      (viewTransform: Transform) =>
        set((_) => ({ viewTransform })),
  })
);