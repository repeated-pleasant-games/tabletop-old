import React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { actors } from "~/reducers/tabletop";
import ControlPanel, { ControlPanel as DisconnectedControlPanel } from "./ControlPanel";

describe("Disconnected ControlPanel", () =>
{
  it("Is a div.", () =>
  {
    const { getByTestId } = render(<DisconnectedControlPanel />);
    expect(getByTestId("control-panel").nodeName.toLowerCase()).toBe("div");
  });

  it("Contains an element that says 'Add Actor'.", () =>
  {
    const { getByText } = render(<DisconnectedControlPanel />);

    expect(getByText("Add Actor")).toBeInTheDocument();
  });
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
});