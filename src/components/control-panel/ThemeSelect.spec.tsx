import React from "react";
import { AnyAction, applyMiddleware, combineReducers, createStore } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { Provider } from "react-redux";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { themePreference } from "~/reducers/app";
import { setThemePreference } from "~/actions/app";
import ThemeSelect, { ThemeSelect as DisconnectedThemeSelect } from "./ThemeSelect";

describe("Disconnected ThemeSelect", () =>
{
  it("Renders a radio button for each theme.", () =>
  {
    const {getByLabelText} = render(
      <DisconnectedThemeSelect />
    );

    expect((getByLabelText(/light/i) as HTMLInputElement).type).toBe("radio");
    expect((getByLabelText(/system/i) as HTMLInputElement).type).toBe("radio");
    expect((getByLabelText(/dark/i) as HTMLInputElement).type).toBe("radio");
  });
});

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

describe("Connected ThemeSelect", () =>
{
  it.each([
    [ /light/i, "light" ],
    [ /system/i, "system" ],
    [ /dark/i, "dark" ],
  ])("Selects the same theme as what is in the store.", (selector, theme) =>
  {
    const store = createStore(
      combineReducers({ themePreference }),
      {},
      applyMiddleware<ThunkDispatch<{}, unknown, AnyAction>, {}>(thunk)
    );
    store.dispatch(setThemePreference(theme));

    const {getByLabelText} = render(
      <Provider store={store}>
        <ThemeSelect />
      </Provider>
    );

    expect((getByLabelText(selector) as HTMLInputElement).checked).toBe(true);
  });

  it.each([
    { from: "system", to: "light", option: "Light", selector: /light/i },
    { from: "dark", to: "light", option: "Light", selector: /light/i },
    { from: "light", to: "system", option: "System", selector: /system/i },
    { from: "dark", to: "system", option: "System", selector: /system/i },
    { from: "light", to: "dark", option: "Dark", selector: /dark/i },
    { from: "system", to: "dark", option: "Dark", selector: /dark/i },
  ])(
    "Changes theme from $from to $to when selecting '$option'.",
    ({ from, to, selector }) =>
    {
      const store = createStore(
        combineReducers({ themePreference }),
        {},
        applyMiddleware<ThunkDispatch<{}, unknown, AnyAction>, {}>(thunk)
      );
      store.dispatch(setThemePreference(from));

      const {getByLabelText} = render(
        <Provider store={store}>
          <ThemeSelect />
        </Provider>
      );

      fireEvent.click(getByLabelText(selector));

      expect((getByLabelText(selector) as HTMLInputElement).checked).toBe(true);
      expect(store.getState().themePreference).toBe(to);
    }
  );
});