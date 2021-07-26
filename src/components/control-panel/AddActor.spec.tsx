import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { useSharedStoreFactory } from "~/store/shared";

import { v4 as uuidv4 } from "uuid";

import AddActor, { AddActor as DisconnectedAddActor} from "./AddActor";
import { SharedStoreContext } from "~/App";

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
    const useSharedStore = useSharedStoreFactory(uuidv4());
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