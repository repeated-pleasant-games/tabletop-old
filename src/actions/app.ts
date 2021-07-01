import { ThunkAction } from "redux-thunk";
import { getColorMode, setColors } from "~/utility/theme";

export type SetThemePayload =
{
  type: "set theme",
  theme: string,
};
export const setThemePreference = (theme: string): ThunkAction<unknown, {}, {}, SetThemePayload> =>
  (dispatch) =>
  {
    window.localStorage.setItem("themePreference", theme);

    setColors(getColorMode(theme));

    dispatch(
      ({
        type: "set theme",
        theme
      })
    );
  };