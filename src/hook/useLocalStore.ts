import create from "zustand";

import { identityTransform, Transform } from "@/lib/Transform";
import { createGridSnapState, GridSnapState } from "@/feature/grid-snap";
import { createThemeState, ThemeState } from "@/feature/theme-select";

type LocalState = GridSnapState & ThemeState &
{
  viewTransform: Transform,
  setViewTransform: (viewTransform: Transform) => void,

  room: string,
  setRoom: (roomName: string) => void,
};

export const useLocalStore = create<LocalState>(
  (set) =>
  ({
    ...createGridSnapState(set),
    ...createThemeState(set),

    viewTransform: identityTransform(),
    setViewTransform:
      (viewTransform: Transform) =>
        set((_) => ({ viewTransform })),

    room: "",
    setRoom: (roomName) =>
      set(() => ({ room: roomName })),
  })
);