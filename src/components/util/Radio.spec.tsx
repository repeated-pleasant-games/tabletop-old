import React from "react";
import { fireEvent, render } from "@testing-library/react";

import { Radio } from "./Radio";

describe("Radio", () =>
{
  it("Displays a radio button.", () =>
  {
    const { getByLabelText } = render(
      <Radio name="fish">
        <Radio.Option value="red">Red fish</Radio.Option>
      </Radio>
    );

    expect(getByLabelText("Red fish").nodeName.toLowerCase()).toBe("input");
    expect((getByLabelText("Red fish") as HTMLInputElement).type).toBe("radio");
  });

  it("Gives all Radio.Options the same field name.", () =>
  {
    const { getByLabelText } = render(
      <Radio name="fish">
        <Radio.Option value="red">Red fish</Radio.Option>
      </Radio>
    );

    expect((getByLabelText("Red fish") as HTMLInputElement).name).toBe("fish");
  });

  it("Gives a Radio.Option the specified value.", () =>
  {
    const { getByLabelText } = render(
      <Radio name="fish">
        <Radio.Option value="red">Red fish</Radio.Option>
      </Radio>
    );

    expect((getByLabelText("Red fish") as HTMLInputElement).value).toBe("red");
  });

  it("Changes Radio.Option checked state when it is clicked.", () =>
  {
    const { getByLabelText } = render(
      <Radio name="fish">
        <Radio.Option value="red">Red fish</Radio.Option>
      </Radio>
    );

    const redFish = getByLabelText("Red fish") as HTMLInputElement;

    expect(redFish.checked).toBe(false);

    fireEvent.click(redFish);

    expect(redFish.checked).toBe(true);
  });

  it("Calls onChange when an Option is clicked.", () =>
  {
    const onChange = jest.fn();

    const { getByLabelText } = render(
      <Radio name="fish" onChange={onChange}>
        <Radio.Option value="red">Red fish</Radio.Option>
      </Radio>
    );

    fireEvent.click(getByLabelText("Red fish"));

    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith("red");
  });

  it("Changes between Radio.Options when they are checked.", () =>
  {
    const { getByLabelText } = render(
      <Radio name="fish">
        <Radio.Option value="red">Red fish</Radio.Option>
        <Radio.Option value="blue">Blue fish</Radio.Option>
      </Radio>
    );

    const redFish = getByLabelText("Red fish") as HTMLInputElement;
    const blueFish = getByLabelText("Blue fish") as HTMLInputElement;

    expect(redFish.checked).toBe(false);
    expect(blueFish.checked).toBe(false);

    fireEvent.click(redFish);
    expect(redFish.checked).toBe(true);
    expect(blueFish.checked).toBe(false);

    fireEvent.click(blueFish);
    expect(redFish.checked).toBe(false);
    expect(blueFish.checked).toBe(true);

    fireEvent.click(redFish);
    expect(redFish.checked).toBe(true);
    expect(blueFish.checked).toBe(false);
  });

  it("Sets a Option as checked when given a checked prop.", () =>
  {
    const { getByLabelText } = render(
      <Radio name="fish">
        <Radio.Option value="red" checked>Red fish</Radio.Option>
      </Radio>
    );

    expect((getByLabelText("Red fish") as HTMLInputElement).checked).toBe(true);
  });

  it("Calls onChange when an Option is set as checked.", () =>
  {
    const onChange = jest.fn();

    render(
      <Radio name="fish" onChange={onChange}>
        <Radio.Option value="red" checked>Red fish</Radio.Option>
      </Radio>
    );

    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith("red");
  });

  it("Calls onChange several times when multiple Options are set as checked.", () =>
  {
    const onChange = jest.fn();

    render(
      <Radio name="fish" onChange={onChange}>
        <Radio.Option value="red" checked>Red fish</Radio.Option>
        <Radio.Option value="blue" checked>Blue fish</Radio.Option>
      </Radio>
    );

    expect(onChange).toBeCalledTimes(2);
    expect(onChange).toBeCalledWith("blue");
  });
});