import { SetThemePayload } from "~/actions/app";

export const themePreference = (theme: string = "system", action: SetThemePayload) =>
{
  switch (action.type)
  {
    case "set theme":
      return action.theme;

    default:
      return theme;
  }
};