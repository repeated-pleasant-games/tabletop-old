import { setTheme } from "./app";

describe("setTheme", () =>
{
  it("Returns a payload with type 'set theme'.", () =>
  {
    expect(
      setTheme("light").type
    )
    .toBe("set theme");
  });

  it.each([
    [ "light" ],
    [ "dark" ],
    [ "brazilian "]
  ])("Returns a payload with theme equal to the given theme.", (theme) =>
  {
    expect(
      setTheme(theme).theme
    )
    .toBe(theme);
  });
});