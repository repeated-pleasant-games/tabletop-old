import React from "react";
import { Provider } from "react-redux";
import { AnyAction, applyMiddleware, combineReducers, createStore } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";

import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { actors, snapToGrid } from "~/reducers/tabletop";
import { theme } from "~/reducers/app";
import ControlPanel, { ControlPanel as DisconnectedControlPanel, controlPanelTestId } from "./ControlPanel";
import { addActor, setSnapToGrid } from "~/actions/tabletop";
import { setTheme } from "~/actions/app";

describe("Disconnected ControlPanel", () =>
{
  it("Is a div.", () =>
  {
    const { getByTestId } = render(<DisconnectedControlPanel />);
    expect(getByTestId(controlPanelTestId).nodeName.toLowerCase()).toBe("div");
  });

  it("Contains an element that says 'Add Actor'.", () =>
  {
    const { getByText } = render(<DisconnectedControlPanel />);

    expect(getByText("Add Actor")).toBeInTheDocument();
  });

  it("Has the class .control-panel", () =>
  {
    const { getByTestId } = render(<DisconnectedControlPanel />);

    expect(getByTestId(controlPanelTestId).className).toBe("control-panel");
  })
});

describe("Connected ControlPanel", () =>
{
  it("Adds an actor to app store when 'Add Actor' is pressed.", () =>
  {
    const store = createStore(combineReducers({ actors }));

    const { getByText } = render(
      <Provider store={store}>
        <ControlPanel />
      </Provider>
    );

    fireEvent.click(getByText("Add Actor"));

    expect(store.getState().actors.length).toBe(1);
  });

  it("Shows a list of actors when there is an actor in the store.", () =>
  {
    const store = createStore(combineReducers({ actors }));
    store.dispatch(addActor({
      id: "",
      name: "Actor 1",
      initiative: 0,
      x: 0,
      y: 0
    }));

    const { getByText } = render(
      <Provider store={store}>
        <ControlPanel />
      </Provider>
    );

    expect(getByText("Actor 1")).toBeInTheDocument();
  });

  it.each([
    [
      [
        {
          id: "1",
          name: "Actor 1",
          initiative: 2,
          x: 0,
          y: 0
        },
        {
          id: "2",
          name: "Actor 2",
          initiative: 1,
          x: 0,
          y: 0
        }
      ],
      [
        "Actor 1",
        "Actor 2"
      ]
    ],
    [
      [
        {
          id: "1",
          name: "Actor 1",
          initiative: 10,
          x: 0,
          y: 0
        },
        {
          id: "2",
          name: "Actor 2",
          initiative: 15,
          x: 0,
          y: 0
        }
      ],
      [
        "Actor 2",
        "Actor 1"
      ]
    ]
  ])(
    "Orders actors by their initiative from greatest to least.",
    (testActors, expectedOrder) =>
  {
    const store = createStore(combineReducers({ actors }));

    for (let actor of testActors)
      store.dispatch(addActor(actor));

    const { getAllByText } = render(
      <Provider store={store}>
        <ControlPanel />
      </Provider>
    );

    const entries = getAllByText(/.*/i, { selector: "li" })

    expect(entries.map(
      (entry) => entry.textContent.trim()
    )).toStrictEqual(
      expectedOrder
    );
  });

  it("Removes the actor associated with the clicked initiative entry.", () =>
  {
    const store = createStore(combineReducers({ actors }));
    store.dispatch(addActor({
      id: "1",
      name: "Actor 1",
      initiative: 0,
      x: 0,
      y: 0
    }));

    const { getByText } = render(
      <Provider store={store}>
        <ControlPanel />
      </Provider>
    );

    fireEvent.click(getByText("Actor 1"));

    expect(() => getByText("Actor 1")).toThrow();
  });

  it("Enables snap-to-grid when 'Snap to Grid' checkbox is checked.", () =>
  {
    const store = createStore(combineReducers({ snapToGrid }));
    store.dispatch(setSnapToGrid(false));

    const { getByLabelText } = render(
      <Provider store={store}>
        <ControlPanel />
      </Provider>
    );

    fireEvent.click(getByLabelText("Snap to Grid"));

    expect(store.getState().snapToGrid).toBe(true);
  });

  it("Unchecks 'Snap to Grid' when snapToGrid is false.", () =>
  {
    const store = createStore(combineReducers({ snapToGrid }));
    store.dispatch(setSnapToGrid(false));

    const { getByLabelText } = render(
      <Provider store={store}>
        <ControlPanel />
      </Provider>
    );

    expect(getByLabelText("Snap to Grid")).not.toHaveAttribute("checked");
  });

  it("Checks 'Snap to Grid' when snapToGrid is true.", () =>
  {
    const store = createStore(combineReducers({ snapToGrid }));
    store.dispatch(setSnapToGrid(true));

    const { getByLabelText } = render(
      <Provider store={store}>
        <ControlPanel />
      </Provider>
    );

    expect(getByLabelText("Snap to Grid")).toHaveAttribute("checked");
  });

  it("Disables snap-to-grid when 'Snap to Grid' is unchecked.", () =>
  {
    const store = createStore(combineReducers({ snapToGrid }));
    store.dispatch(setSnapToGrid(true));

    const { getByLabelText } = render(
      <Provider store={store}>
        <ControlPanel />
      </Provider>
    );

    fireEvent.click(getByLabelText("Snap to Grid"));

    expect(store.getState().snapToGrid).toBe(false);
  });

  it("Checks 'light' theme indicator when theme is set to 'light'.", () =>
  {
    const store = createStore(
      combineReducers({ themePreference: theme }),
      {},
      applyMiddleware<ThunkDispatch<{}, unknown, AnyAction>, {}>(thunk)
    );
    store.dispatch(setTheme('light'));

    const { getByLabelText } = render(
      <Provider store={store}>
        <ControlPanel />
      </Provider>
    );

    expect((getByLabelText("Light") as HTMLInputElement).checked).toBe(true);
  });

  it("Checks 'dark' theme indicator when theme is set to 'dark'.", () =>
  {
    const store = createStore(
      combineReducers({ themePreference: theme }),
      {},
      applyMiddleware<ThunkDispatch<{}, unknown, AnyAction>, {}>(thunk)
    );
    store.dispatch(setTheme('dark'));

    const { getByLabelText } = render(
      <Provider store={store}>
        <ControlPanel />
      </Provider>
    );

    expect((getByLabelText("Dark") as HTMLInputElement).checked).toBe(true);
  });

  it.each([
    [ 'light', [ true, false ] ],
    [ 'dark', [ false, true ] ]
  ])("Only checks one theme at a time.", (themeName, [ dayState, darkState ]) =>
  {
    const store = createStore(
      combineReducers({ themePreference: theme }),
      {},
      applyMiddleware<ThunkDispatch<{}, unknown, AnyAction>, {}>(thunk)
    );
    store.dispatch(setTheme(themeName));

    const { getByLabelText } = render(
      <Provider store={store}>
        <ControlPanel />
      </Provider>
    );

    expect((getByLabelText("Light") as HTMLInputElement).checked).toBe(dayState);
    expect((getByLabelText("Dark") as HTMLInputElement).checked).toBe(darkState);
  });

  it("Sets theme to day when day theme is clicked.", () =>
  {
    const store = createStore(
      combineReducers({ themePreference: theme }),
      {},
      applyMiddleware<ThunkDispatch<{}, unknown, AnyAction>, {}>(thunk)
    );
    store.dispatch(setTheme("dark"));

    const { getByLabelText } = render(
      <Provider store={store}>
        <ControlPanel />
      </Provider>
    );

    fireEvent.click(getByLabelText("Light"));

    expect(store.getState().themePreference).toBe("light");
  });

  it("Sets theme to dark when dark theme is clicked.", () =>
  {
    const store = createStore(
      combineReducers({ themePreference: theme }),
      {},
      applyMiddleware<ThunkDispatch<{}, unknown, AnyAction>, {}>(thunk)
    );
    store.dispatch(setTheme("light"));

    const { getByLabelText } = render(
      <Provider store={store}>
        <ControlPanel />
      </Provider>
    );

    fireEvent.click(getByLabelText("Dark"));

    expect(store.getState().themePreference).toBe("dark");
  });
});