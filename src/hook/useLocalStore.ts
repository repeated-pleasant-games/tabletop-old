import create from "zustand";

import { identityTransform, Transform } from "@/lib/Transform";
import { createGridSnapState, GridSnapState } from "@/feature/grid-snap";
import { createThemeState, ThemeState } from "@/feature/theme-select";
import { createRoomState, RoomState } from "@/feature/room";

type LocalState = GridSnapState & ThemeState & RoomState &
{
  viewTransform: Transform,
  setViewTransform: (viewTransform: Transform) => void,
};

export const useLocalStore = create<LocalState>(
  (set) =>
  ({
    ...createGridSnapState(set),
    ...createThemeState(set),
    ...createRoomState(set),

    viewTransform: identityTransform(),
    setViewTransform:
      (viewTransform: Transform) =>
        set((_) => ({ viewTransform })),
  })
);