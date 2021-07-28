import { SetState } from "zustand";

export type GridSnapState =
{
  snapToGrid: boolean,
  setSnapToGrid: (snapToGrid: boolean) => void,
};

export const createGridSnapState = (set: SetState<GridSnapState>) =>
({
  snapToGrid: false,
  setSnapToGrid:
    (snapToGrid: boolean) =>
      set((_) => ({ snapToGrid })),
});