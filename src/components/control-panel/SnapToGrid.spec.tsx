import React from "react";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { fireEvent, render } from "@testing-library/react";

import { snapToGrid } from "~/reducers/tabletop"
import SnapToGrid, { SnapToGrid as DisconnectedSnapToGrid } from "./SnapToGrid";
import { setSnapToGrid } from "~/actions/tabletop";

describe("Disconnected SnapToGrid", () =>
{
  it("Renders a checkbox labelled with 'Snap to Grid'.", () =>
  {
    const { getByLabelText } = render(
      <DisconnectedSnapToGrid />
    );

    expect((getByLabelText(/snap to grid/i) as HTMLInputElement).type).toBe("checkbox");
  });
});

describe("Connected SnapToGrid", () =>
{
  it("Is unchecked when snapToGrid state is false.", () =>
  {
    const store = createStore(combineReducers({ snapToGrid }))
    store.dispatch(setSnapToGrid(false));

    const { getByLabelText } = render(
      <Provider store={store}>
        <SnapToGrid />
      </Provider>
    );

    expect((getByLabelText(/snap to grid/i) as HTMLInputElement).checked).toBe(false);
  });

  it("Is checked when snapToGrid state is true.", () =>
  {
    const store = createStore(combineReducers({ snapToGrid }))
    store.dispatch(setSnapToGrid(true));

    const { getByLabelText } = render(
      <Provider store={store}>
        <SnapToGrid />
      </Provider>
    );

    expect((getByLabelText(/snap to grid/i) as HTMLInputElement).checked).toBe(true);
  });

  it("Sets snapToGrid to true when checked.", () =>
  {
    const store = createStore(combineReducers({ snapToGrid }))
    store.dispatch(setSnapToGrid(false));

    const { getByLabelText } = render(
      <Provider store={store}>
        <SnapToGrid />
      </Provider>
    );

    fireEvent.click(getByLabelText(/snap to grid/i));

    expect(store.getState().snapToGrid).toBe(true);
  });

  it("Sets snapToGrid to false when unchecked.", () =>
  {
    const store = createStore(combineReducers({ snapToGrid }))
    store.dispatch(setSnapToGrid(true));

    const { getByLabelText } = render(
      <Provider store={store}>
        <SnapToGrid />
      </Provider>
    );

    fireEvent.click(getByLabelText(/snap to grid/i));

    expect(store.getState().snapToGrid).toBe(false);
  });
});