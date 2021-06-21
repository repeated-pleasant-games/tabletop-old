import { SetThemePayload } from "~/actions/app";

export const theme = (theme: string = "light", action: SetThemePayload) =>
{
  switch (action.type)
  {
    case "set theme":
      return action.theme;

    default:
      return theme;
  }
};