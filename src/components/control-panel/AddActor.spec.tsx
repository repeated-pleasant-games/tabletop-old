import React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { v4 as uuidv4 } from "uuid";
import { UseStore } from "zustand";

import { SharedState, useSharedStoreFactory } from "~/store/shared";
import { SharedStoreContext } from "~/App";

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
    let useSharedStore: UseStore<SharedState>;

    useSharedStore = useSharedStoreFactory(uuidv4());
    useSharedStore.setState(() => ({ actors: [] }));

    const { getByText } = render(
      <SharedStoreContext.Provider value={useSharedStore}>
        <AddActor />
      </SharedStoreContext.Provider>
    );

    const button = getByText("Add Actor");
    fireEvent.click(button);

    expect(useSharedStore.getState().actors.length).toBe(1);
  });
});