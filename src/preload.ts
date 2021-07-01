const getThemePreference = () =>
{
  const storedThemePreference = window.localStorage.getItem('themePreference');

  if (storedThemePreference !== null) return storedThemePreference;
  else                                return "system";
};

const getInitialColorMode = (themePreference: string) =>
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
      return query.matches ? "dark" : "light";
    }
  }
};

const setColorMode = (colorMode: string) =>
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

const themePreference = getThemePreference();

setColorMode(getInitialColorMode(themePreference));

window.document.documentElement.style
.setProperty(`--theme-preference`, themePreference);

window.matchMedia("(prefers-color-scheme: dark)")
.addEventListener(
    "change",
    () =>
    {
        const themePreference = getThemePreference();
        setColorMode(getInitialColorMode(themePreference));
    }
);