import React from "react";
import { fireEvent, render } from "@testing-library/react";
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
    expect((getByLabelText("Room Name") as HTMLInputElement).type).toBe("text");
  });

  it("Has a submit button that says 'Join!'.", () =>
  {
    const { getByText } = render(<JoinForm />);
    expect((getByText("Join!") as HTMLInputElement).type).toBe("submit")
  });

  it.each([
    [ "room" ],
    [ "antechamber" ]
  ])("Sets room code ('%s') when you press 'Join!'.", (roomName) =>
  {
    useLocalStore.setState(() => ({ room: "", }));
    
    global.HTMLFormElement.prototype.submit = jest.fn();
    const { getByLabelText, getByTestId } = render(<JoinForm />);

    userEvent.type(getByLabelText(/room name/i), roomName);
    fireEvent.submit(getByTestId(joinFormTestId));

    expect(useLocalStore.getState().room).toBe(roomName);
  });
});