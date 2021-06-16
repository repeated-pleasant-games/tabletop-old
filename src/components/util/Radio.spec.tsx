import React from "react";
import { render } from "@testing-library/react";

import { Radio } from "./Radio";

describe("Radio", () =>
{
  it("Displays a radio button.", () =>
  {
    const { getByLabelText } = render(
      <Radio name="fish">
        <Radio.Option>Red fish</Radio.Option>
      </Radio>
    );

    expect(getByLabelText("Red fish").nodeName.toLowerCase()).toBe("input");
    expect((getByLabelText("Red fish") as HTMLInputElement).type).toBe("radio");
  });

  it("Gives all Radio.Options the same field name.", () =>
  {
    const { getByLabelText } = render(
      <Radio name="fish">
        <Radio.Option>Red fish</Radio.Option>
      </Radio>
    );

    expect((getByLabelText("Red fish") as HTMLInputElement).name).toBe("fish");
  });
});