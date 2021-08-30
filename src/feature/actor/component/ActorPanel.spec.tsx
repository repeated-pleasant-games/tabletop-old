import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { v4 as uuidv4 } from "uuid";

import { SharedStoreProvider } from "@/context/SharedStore";

import ActorPanel from "./ActorPanel";
import userEvent from "@testing-library/user-event";

describe("Actor Panel", () =>
{
  it("Shows 'no actors' when there are no actors.", () =>
  {
    const { getByText, } = render(
      <SharedStoreProvider room={uuidv4()}>
        <ActorPanel />
      </SharedStoreProvider>
    );

    expect(getByText(/no actors/i)).toBeInTheDocument();
  });

  it("Adds an actor when the 'add actor' button is pressed.", async () =>
  {
    const { getByText, getAllByText, getByLabelText } = render(
      <SharedStoreProvider room={uuidv4()}>
        <ActorPanel />
      </SharedStoreProvider>
    );

    userEvent.type(getByLabelText(/actor name/i), "Actor");
    fireEvent.click(getByText(/add actor/i));

    await waitFor(() =>
    {
      expect(getAllByText(/^actor$/i).length).toBe(1);
    })
  });

  it("Removes an actor when its entry is clicked.", async () =>
  {
    const { getByText, getAllByText, getByLabelText } = render(
      <SharedStoreProvider room={uuidv4()}>
        <ActorPanel />
      </SharedStoreProvider>
    );

    const addActorButton = getByText(/add actor/i);

    userEvent.type(getByLabelText(/actor name/i), "Actor");
    fireEvent.click(addActorButton);
    fireEvent.click(addActorButton);

    await waitFor(() =>
    {
      expect(getAllByText(/^actor$/i).length).toBe(2);
    });

    fireEvent.click(getAllByText(/^actor$/i)[0]);

    await waitFor(() =>
    {
      expect(getAllByText(/^actor$/i).length).toBe(1);
    })
  });
});