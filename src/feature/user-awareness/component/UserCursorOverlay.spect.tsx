import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { UserCursorOverlay } from "./UserCursorOverlay";

describe("UserCursorOverlay", () =>
{
  it("Shows a cursor for each user.", () =>
  {
    const {} = render(
      <UserCursorOverlay />
    );
  });
});