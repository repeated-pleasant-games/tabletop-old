import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

export type SetThemePayload =
{
  type: "set theme",
  theme: string,
};
export const setTheme = (theme: string): ThunkAction<void, {}, void, SetThemePayload> =>
  (dispatch) =>
  {
    window.localStorage.setItem("theme", theme);
    dispatch(
      ({
        type: "set theme",
        theme
      })
    );
  };