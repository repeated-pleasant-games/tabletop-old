import React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { actors } from "~/reducers/tabletop";
import ControlPanel, { ControlPanel as DisconnectedControlPanel, controlPanelTestId } from "./ControlPanel";
import { addActor } from "~/actions/tabletop";

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
});