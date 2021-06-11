import { setTheme } from "./app";

describe("setTheme", () =>
{
  it("Returns a payload with type 'set theme'.", () =>
  {
    expect(
      setTheme("day").type
    )
    .toBe("set theme");
  });

  it.each([
    [ "day" ],
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