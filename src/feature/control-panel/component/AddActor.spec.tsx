import React, { useEffect } from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { useUseSharedStore, SharedState } from "@/context/SharedStore";

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
    const Component = () =>
    {
      const useSharedStore = useUseSharedStore();

      useEffect(
        () =>
        {
          useSharedStore.setState(() => ({ actors: [] }));
        },
        []
      );

      return (
        <AddActor />
      );
    }

    const { getByText } = render(
      <Component />
    );

    const button = getByText("Add Actor");
    fireEvent.click(button);

    expect(useSharedStore.getState().actors.length).toBe(1);
  });
});