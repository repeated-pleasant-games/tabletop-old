import { SetThemePayload } from "~/actions/app";
import { themePreference } from "./app";

describe("theme reducer", () =>
{
  it("Initializes with theme 'system'.", () =>
  {
    expect(
      themePreference(
        undefined,
        {} as SetThemePayload
      )
    )
    .toBe("system");
  });

  it.each([
    [
      undefined,
      "light"
    ],
    [
      undefined,
      "dark"
    ],
    [
      "day",
      "dark"
    ]
  ])(
    "Sets the theme to the theme indicated by the sent action.",
    (initialTheme, newTheme) =>
    {
      expect(
        themePreference(
          initialTheme,
          {
            type: "set theme",
            theme: newTheme
          }
        )
      )
      .toBe(newTheme)
    }
  );
});