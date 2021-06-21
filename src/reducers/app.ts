import { SetThemePayload } from "~/actions/app";

const initialTheme =
  window.document.documentElement.style.getPropertyValue("--initial-theme")
  || "light";

export const theme = (theme: string = initialTheme, action: SetThemePayload) =>
{
  switch (action.type)
  {
    case "set theme":
      return action.theme;

    default:
      return theme;
  }
};