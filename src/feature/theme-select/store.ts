import { SetState } from "zustand";
import { getThemePreference, setColors, getColorMode } from "@/util/theme";

export type ThemeState =
{
  themePreference: "system" | "light" | "dark",
  setThemePreference: (themePreference: "system" | "light" | "dark") => void,
};

export const createThemeState = (set: SetState<ThemeState>) =>
({
  themePreference: (getThemePreference() as "system" | "light" | "dark"),
  setThemePreference:
    (themePreference: "system" | "light" | "dark") =>
    {
      window.localStorage.setItem("themePreference", themePreference);
      setColors(getColorMode(themePreference));
      return set((_) => ({ themePreference }));
    },
});