import { ThunkDispatch } from "redux-thunk";
import { setTheme } from "./app";

describe("setTheme", () =>
{
  it.each([
    [ "light" ],
    [ "dark" ],
    [ "brazilian "]
  ])("Async dispatches a payload with the given type.", (theme) =>
  {
    const dispatch = jest.fn();
    const thunk = setTheme(theme);

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