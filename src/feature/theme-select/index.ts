import { getThemePreference, getColorMode, setColors } from "./util";

export * from "./component/ThemeSelect";
export * from "./store";

export const detectAndSetTheme = () =>
{
  const themePreference = getThemePreference();

  setColors(getColorMode(themePreference));

  window.document.documentElement.style
  .setProperty(`--theme-preference`, themePreference);
};