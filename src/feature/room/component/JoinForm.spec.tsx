import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import JoinForm, { joinFormTestId } from "./JoinForm";
import { useLocalStore } from "@/hook/useLocalStore";

describe("JoinForm component", () =>
{
  it("Is a form.", () =>
  {
    const { getByTestId } = render(<JoinForm />);
    expect(getByTestId(joinFormTestId).tagName.toLowerCase()).toBe("form");
  });

  it("Has an input field labelled 'Room Name'.", () =>
  {
    const { getByLabelText } = render(<JoinForm />);
    expect((getByLabelText(/room name/i) as HTMLInputElement).type).toBe("text");
  });

  it("Has a submit button that says 'Join!'.", () =>
  {
    const { getByText } = render(<JoinForm />);
    expect((getByText(/join!/i) as HTMLInputElement).type).toBe("submit")
  });

  it.each([
    [ "room" ],
    [ "antechamber" ]
  ])("Sets room code ('%s') when you press 'Join!'.", async (roomName) =>
  {
    act(() =>
    {
      useLocalStore.setState(() => ({ room: "", }));
    });
    
    const { getByLabelText, getByText } = render(<JoinForm />);

    userEvent.type(getByLabelText(/room name/i), roomName);
    fireEvent.click(getByText(/join!/i));

    await waitFor(() =>
    {
      expect(useLocalStore.getState().room).toBe(roomName);
    });
  });
});