import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ThemeSelect from "./ThemeSelect";

describe("Disconnected ThemeSelect", () =>
{
  it("Renders a radio button for each theme.", () =>
  {
    const {getByLabelText} = render(
      <ThemeSelect />
    );

    expect((getByLabelText(/light/i) as HTMLInputElement).type).toBe("radio");
    expect((getByLabelText(/dark/i) as HTMLInputElement).type).toBe("radio");
  });
});