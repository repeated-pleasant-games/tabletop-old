import React from "react";
import { fireEvent, render } from "@testing-library/react";

import { Checkbox } from "./Checkbox";

describe("Checkbox", () =>
{
  it("Renders a checkbox element.", () =>
  {
    const {getByLabelText} = render(
      <Checkbox>Hello, World!</Checkbox>
    );

    expect(getByLabelText("Hello, World!").nodeName.toLowerCase()).toBe("input");
    expect((getByLabelText("Hello, World!") as HTMLInputElement).type).toBe("checkbox");
  });

  it("Starts unchecked.", () =>
  {
    const {getByLabelText} = render(
      <Checkbox>Hello, World!</Checkbox>
    );

    expect((getByLabelText("Hello, World!") as HTMLInputElement).checked).toBe(false);
  });

  it("Is checked after mouse click.", () =>
  {
    const {getByLabelText} = render(
      <Checkbox>Hello, World!</Checkbox>
    );

    fireEvent.click(getByLabelText("Hello, World!"));

    expect((getByLabelText("Hello, World!") as HTMLInputElement).checked).toBe(true);
  });

  it("Is not checked when checked is false", () =>
  {
    const { getByLabelText } = render(
      <Checkbox checked={false}>Hello, World!</Checkbox>
    );

    expect((getByLabelText("Hello, World!") as HTMLInputElement).checked).toBe(false);
  });

  it("Is checked when checked is true", () =>
  {
    const { getByLabelText } = render(
      <Checkbox checked={true}>Hello, World!</Checkbox>
    );

    expect((getByLabelText("Hello, World!") as HTMLInputElement).checked).toBe(true);
  });

  it("Calls the given onChecked when checked.", () =>
  {
    const onChecked = jest.fn();
    
    const {getByLabelText} = render(
      <Checkbox onChecked={onChecked} checked={false}>Hello, World!</Checkbox>
    );

    fireEvent.click(getByLabelText("Hello, World!"));

    expect(onChecked).toBeCalledTimes(1);
  });

  it("Does not call the given onChecked when unchecked.", () =>
  {
    const onChecked = jest.fn();
    
    const {getByLabelText} = render(
      <Checkbox onChecked={onChecked} checked={true}>Hello, World!</Checkbox>
    );

    fireEvent.click(getByLabelText("Hello, World!"));

    expect(onChecked).not.toBeCalled();
  });

  it("Calls the given onUnchecked when unchecked.", () =>
  {
    const onUnchecked = jest.fn();
    
    const {getByLabelText} = render(
      <Checkbox onUnchecked={onUnchecked} checked={true}>Hello, World!</Checkbox>
    );

    fireEvent.click(getByLabelText("Hello, World!"));

    expect(onUnchecked).toBeCalledTimes(1);
  });

  it("Does not call the given onUnchecked when checked.", () =>
  {
    const onUnchecked = jest.fn();
    
    const {getByLabelText} = render(
      <Checkbox onUnchecked={onUnchecked} checked={false}>Hello, World!</Checkbox>
    );

    fireEvent.click(getByLabelText("Hello, World!"));

    expect(onUnchecked).not.toBeCalled();
  });
});