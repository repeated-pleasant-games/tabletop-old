import create from "zustand";

import { identityTransform, Transform } from "@/lib/Transform";
import { getColorMode, getThemePreference, setColors } from "@/util/theme";
import { createGridSnapState, GridSnapState } from "@/feature/grid-snap";

type LocalState = GridSnapState &
{
  themePreference: "system" | "light" | "dark",
  setThemePreference: (themePreference: "system" | "light" | "dark") => void,

  viewTransform: Transform,
  setViewTransform: (viewTransform: Transform) => void,

  room: string,
  setRoom: (roomName: string) => void,
};

export const useLocalStore = create<LocalState>(
  (set) =>
  ({
    ...createGridSnapState(set),

    themePreference: (getThemePreference() as "system" | "light" | "dark"),
    setThemePreference:
      (themePreference: "system" | "light" | "dark") =>
      {
        window.localStorage.setItem("themePreference", themePreference);
        setColors(getColorMode(themePreference));
        return set((_) => ({ themePreference }));
      },

    viewTransform: identityTransform(),
    setViewTransform:
      (viewTransform: Transform) =>
        set((_) => ({ viewTransform })),

    room: "",
    setRoom: (roomName) =>
      set(() => ({ room: roomName })),
  })
);