import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ActorPanel from "./ActorPanel";

describe("Actor Panel", () =>
{
  it("Shows 'no actors' when there are no actors.", () =>
  {
    const { getByText } = render(<ActorPanel />);

    expect(getByText(/no actors/i)).toBeInTheDocument();
  });

  it("Adds an actor when the 'add actor' button is pressed.", () =>
  {
    const { getByText, getAllByText } = render(<ActorPanel />);

    fireEvent.click(getByText(/add actor/i));

    expect(getAllByText(/^actor$/i).length).toBe(1);
  });
});