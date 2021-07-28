import React from "react";
import { fireEvent, render } from "@testing-library/react";

import { Button } from "./Button";

describe("Button", () =>
{
  it("Renders a button element.", () =>
  {
    const { getByText } = render(
      <Button>Hello, World!</Button>
    );

    expect(getByText("Hello, World!").nodeName.toLowerCase()).toBe("button");
  });

  it("Calls the given onClick on mouse click.", () =>
  {
    const onClick = jest.fn();

    const { getByText } = render(
      <Button onClick={onClick}>Hello, World!</Button>
    );

    fireEvent.click(getByText("Hello, World!"));

    expect(onClick).toBeCalledTimes(1);
  });
});