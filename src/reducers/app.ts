import { SetThemePayload } from "~/actions/app";

export const theme = (theme: string = "day", action: SetThemePayload) =>
{
  switch (action.type)
  {
    case "set theme":
      return action.theme;

    default:
      return theme;
  }
};