import create from "zustand";

import { identityTransform, Transform } from "~/core/Transform";

type LocalState =
{
  themePreference: "system" | "light" | "dark",
  setThemePreference: (themePreference: "system" | "light" | "dark") => void,

  viewTransform: Transform,
  setViewTransform: (viewTransform: Transform) => void,

  snapToGrid: boolean,
  setSnapToGrid: (snapToGrid: boolean) => void,
};

export const useLocalStore = create<LocalState>(
  (set) =>
  ({
    themePreference: "system",
    setThemePreference:
      (themePreference: "system" | "light" | "dark") =>
        set((_) => ({ themePreference })),

    viewTransform: identityTransform(),
    setViewTransform:
      (viewTransform: Transform) =>
        set((_) => ({ viewTransform })),

    snapToGrid: false,
    setSnapToGrid:
      (snapToGrid: boolean) =>
        set((_) => ({ snapToGrid })),
  })
);