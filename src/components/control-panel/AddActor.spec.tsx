import React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { actors } from "~/reducers/tabletop";
import AddActor, { AddActor as DisconnectedAddActor} from "./AddActor";

describe("Disconnected AddActor", () =>
{
  it("Renders a button that says 'Add Actor'.", () =>
  {
    const { getByText } = render(
      <DisconnectedAddActor />
    );

    expect(getByText("Add Actor")).toBeInTheDocument();
    expect(getByText("Add Actor").tagName.toLowerCase()).toBe("button");
  });
});

describe("Connected AddActor", () =>
{
  it("Adds an actor when clicked.", () =>
  {
    const store = createStore(combineReducers({ actors }));

    const { getByText } = render(
      <Provider store={store}>
        <AddActor />
      </Provider>
    );

    const button = getByText("Add Actor");
    fireEvent.click(button);

    expect(store.getState().actors.length).toBe(1);
  });
});