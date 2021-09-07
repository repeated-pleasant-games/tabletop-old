import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { v4 as uuidv4 } from "uuid";

import { useLocalStore } from "@/hook/useLocalStore";

import ControlPanel from "./ControlPanel";
import { SharedStoreProvider } from "@/context/SharedStore";

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("Connected ControlPanel", () =>
{
  it("Enables snap-to-grid when 'Snap to Grid' checkbox is checked.", () =>
  {
    useLocalStore.setState(() => ({ snapToGrid: false }));

    const { getByLabelText } = render(
      <SharedStoreProvider room={uuidv4()}>
        <ControlPanel />
      </SharedStoreProvider>
    );

    fireEvent.click(getByLabelText("Snap to Grid"));

    expect(useLocalStore.getState().snapToGrid).toBe(true);
  });

  it("Unchecks 'Snap to Grid' when snapToGrid is false.", () =>
  {
    useLocalStore.setState(() => ({ snapToGrid: false }))

    const { getByLabelText } = render(
      <SharedStoreProvider room={uuidv4()}>
        <ControlPanel />
      </SharedStoreProvider>
    );

    expect(getByLabelText("Snap to Grid")).not.toHaveAttribute("checked");
  });

  it("Checks 'Snap to Grid' when snapToGrid is true.", () =>
  {
    useLocalStore.setState(() => ({ snapToGrid: true }));

    const { getByLabelText } = render(
      <SharedStoreProvider room={uuidv4()}>
        <ControlPanel />
      </SharedStoreProvider>
    );

    expect(getByLabelText("Snap to Grid")).toHaveAttribute("checked");
  });

  it("Disables snap-to-grid when 'Snap to Grid' is unchecked.", () =>
  {
    useLocalStore.setState(() => ({ snapToGrid: true }));

    const { getByLabelText } = render(
      <SharedStoreProvider room={uuidv4()}>
        <ControlPanel />
      </SharedStoreProvider>
    );

    fireEvent.click(getByLabelText("Snap to Grid"));

    expect(useLocalStore.getState().snapToGrid).toBe(false);
  });
});