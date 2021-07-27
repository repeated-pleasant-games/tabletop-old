import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { v4 as uuidv4 } from "uuid";

import { SharedStore } from "@/context/SharedStore";

import ActorPanel from "./ActorPanel";

describe("Actor Panel", () =>
{
  it("Shows 'no actors' when there are no actors.", () =>
  {
    const { getByText, } = render(<ActorPanel />);

    expect(getByText(/no actors/i)).toBeInTheDocument();
  });

  it("Adds an actor when the 'add actor' button is pressed.", () =>
  {
    const { getByText, getAllByText, } = render(<ActorPanel />);

    fireEvent.click(getByText(/add actor/i));

    expect(getAllByText(/^actor$/i).length).toBe(1);
  });

  it("Removes an actor when its entry is clicked.", () =>
  {
    const { getByText, getAllByText, } = render(
      <SharedStore room={uuidv4()}>
        <ActorPanel />
      </SharedStore>
    );

    const addActorButton = getByText(/add actor/i);

    fireEvent.click(addActorButton);
    fireEvent.click(addActorButton);

    expect(getAllByText(/^actor$/i).length).toBe(2);

    fireEvent.click(getAllByText(/^actor$/i)[0]);

    expect(getAllByText(/^actor$/i).length).toBe(1);
  });
});