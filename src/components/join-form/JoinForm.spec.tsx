import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import JoinForm, { joinFormTestId } from "./JoinForm";

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
});