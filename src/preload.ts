import { getThemePreference, getColorMode, setColors } from "./utility/theme";

const detectAndSetTheme = () =>
{
  const themePreference = getThemePreference();

  setColors(getColorMode(themePreference));

  window.document.documentElement.style
  .setProperty(`--theme-preference`, themePreference);
};

detectAndSetTheme();

window.matchMedia("(prefers-color-scheme: dark)")
.addEventListener(
  "change",
  detectAndSetTheme
);