import { ThunkAction } from "redux-thunk";

export type SetThemePayload =
{
  type: "set theme",
  theme: string,
};
export const setTheme = (theme: string): ThunkAction<unknown, {}, {}, SetThemePayload> =>
  (dispatch) =>
  {
    window.localStorage.setItem("themePreference", theme);

    dispatch(
      ({
        type: "set theme",
        theme
      })
    );
  };