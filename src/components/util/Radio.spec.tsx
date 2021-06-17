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
});