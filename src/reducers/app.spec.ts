import { SetThemePayload } from "~/actions/app";
import { theme } from "./app";

describe("theme reducer", () =>
{
  it("Initializes with theme 'light'.", () =>
  {
    expect(
      theme(
        undefined,
        {} as SetThemePayload
      )
    )
    .toBe("light");
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
        theme(
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