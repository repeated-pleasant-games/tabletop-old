import React from "react";
import { fireEvent, render } from "@testing-library/react";

import { useLocalStore } from "~/store/local";

import SnapToGrid, { SnapToGrid as DisconnectedSnapToGrid } from "./SnapToGrid";

describe("Disconnected SnapToGrid", () =>
{
  it("Renders a checkbox labelled with 'Snap to Grid'.", () =>
  {
    const { getByLabelText } = render(
      <DisconnectedSnapToGrid />
    );

    expect((getByLabelText(/snap to grid/i) as HTMLInputElement).type).toBe("checkbox");
  });
});

describe("Connected SnapToGrid", () =>
{
  it("Is unchecked when snapToGrid state is false.", () =>
  {
    useLocalStore.setState(() => ({ snapToGrid: false }));

    const { getByLabelText } = render(<SnapToGrid />);

    expect((getByLabelText(/snap to grid/i) as HTMLInputElement).checked).toBe(false);
  });

  it("Is checked when snapToGrid state is true.", () =>
  {
    useLocalStore.setState(() => ({ snapToGrid: true }));

    const { getByLabelText } = render(<SnapToGrid />);

    expect((getByLabelText(/snap to grid/i) as HTMLInputElement).checked).toBe(true);
  });

  it("Sets snapToGrid to true when checked.", () =>
  {
    useLocalStore.setState(() => ({ snapToGrid: false }));

    const { getByLabelText } = render(<SnapToGrid />);

    fireEvent.click(getByLabelText(/snap to grid/i));

    expect(useLocalStore.getState().snapToGrid).toBe(true);
  });

  it("Sets snapToGrid to false when unchecked.", () =>
  {
    useLocalStore.setState(() => ({ snapToGrid: true }));

    const { getByLabelText } = render(<SnapToGrid />);

    fireEvent.click(getByLabelText(/snap to grid/i));

    expect(useLocalStore.getState().snapToGrid).toBe(false);
  });
});