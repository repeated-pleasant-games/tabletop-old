import { ThunkAction } from "redux-thunk";

export type SetThemePayload =
{
  type: "set theme",
  theme: string,
};
export const setThemePreference = (theme: string): ThunkAction<unknown, {}, {}, SetThemePayload> =>
  (dispatch) =>
  {
    window.localStorage.setItem("themePreference", theme);

    const getColorMode = (themePreference: string) =>
    {
      switch (themePreference)
      {
        case "light":
        case "dark":
          return themePreference;

        case "system":
        default:
        {
          const query = window.matchMedia("(prefers-color-scheme: dark)");
          const hasThemePreference = typeof query.matches === 'boolean';

          if (hasThemePreference)
            return query.matches ? "dark" : "light";

          else
            return "light";
        }
      }
    };

    const setColors = (colorMode: string) =>
    {
      const root = window.document.documentElement;

      root.style.setProperty(
        `--color-fg`,
        colorMode === "light"
        ? `black`
        : `white`
      );

      root.style.setProperty(
        `--color-bg`,
        colorMode === "light"
        ? `white`
        : `black`
      );

      root.style.setProperty(
        `--color-grid-fg`,
        colorMode === "light"
        ? `black`
        : `white`
      );

      root.style.setProperty(
        `--color-grid-bg`,
        colorMode === "light"
        ? `white`
        : `black`
      );
    };

    setColors(getColorMode(theme));

    dispatch(
      ({
        type: "set theme",
        theme
      })
    );
  };