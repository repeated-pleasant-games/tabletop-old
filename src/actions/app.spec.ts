import { ThunkDispatch } from "redux-thunk";
import { setThemePreference } from "./app";

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("setThemePreference", () =>
{
  it.each([
    [ "light" ],
    [ "dark" ],
    [ "brazilian "]
  ])("Async dispatches a payload with the given type.", (theme) =>
  {
    const dispatch = jest.fn();
    const thunk = setThemePreference(theme);

    thunk(dispatch, undefined, undefined)

    expect(dispatch).toHaveBeenNthCalledWith(
      1,
      {
        type: "set theme",
        theme,
      }
    );
  });
});