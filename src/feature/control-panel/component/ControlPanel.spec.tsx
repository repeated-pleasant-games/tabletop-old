import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { v4 as uuidv4 } from "uuid";

import { useLocalStore } from "@/hook/useLocalStore";

import ControlPanel from "./ControlPanel";
import { SharedStoreProvider } from "@/context/SharedStore";
import userEvent from "@testing-library/user-event";

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
  it("Adds an actor to app store when 'Add Actor' is pressed.", () =>
  {
    const { getByText, getAllByText, getByLabelText } = render(
      <SharedStoreProvider room={uuidv4()}>
        <ControlPanel />
      </SharedStoreProvider>
    );

    userEvent.type(getByLabelText(/actor name/i), "Actor");
    fireEvent.click(getByText(/add actor/i));

    waitFor(() =>
    {
      expect(getAllByText(/^actor$/i).length).toBe(1);
    });
  });

  it("Removes the actor associated with the clicked initiative entry.", async () =>
  {
    const { getByText, getByLabelText } = render(
      <SharedStoreProvider room={uuidv4()}>
        <ControlPanel />
      </SharedStoreProvider>
    );

    userEvent.type(getByLabelText(/actor name/i), "Actor");
    fireEvent.click(getByText(/add actor/i));

    waitFor(() =>
    {
      fireEvent.click(getByText(/^actor$/i));
      expect(() => getByText(/^actor$/i)).toThrow();
    });
  });

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

  it("Checks 'light' theme indicator when theme is set to 'light'.", () =>
  {
    useLocalStore.setState(() => ({ themePreference: 'light' }));

    const { getByLabelText } = render(
      <SharedStoreProvider room={uuidv4()}>
        <ControlPanel />
      </SharedStoreProvider>
    );

    expect((getByLabelText("Light") as HTMLInputElement).checked).toBe(true);
  });

  it("Checks 'dark' theme indicator when theme is set to 'dark'.", () =>
  {
    useLocalStore.setState(() => ({ themePreference: 'dark' }));

    const { getByLabelText } = render(
      <SharedStoreProvider room={uuidv4()}>
        <ControlPanel />
      </SharedStoreProvider>
    );

    expect((getByLabelText("Dark") as HTMLInputElement).checked).toBe(true);
  });

  it.each([
    [ 'light', [ true, false ] ],
    [ 'dark', [ false, true ] ]
  ])(
    "Only checks one theme at a time.",
    (
      themeName: "light" | "dark",
      [ dayState, darkState ]
    ) =>
    {
      useLocalStore.setState(() => ({ themePreference: themeName }));

      const { getByLabelText } = render(
        <SharedStoreProvider room={uuidv4()}>
          <ControlPanel />
        </SharedStoreProvider>
      );

      expect((getByLabelText("Light") as HTMLInputElement).checked).toBe(dayState);
      expect((getByLabelText("Dark") as HTMLInputElement).checked).toBe(darkState);
    }
  );

  it("Sets theme to day when day theme is clicked.", () =>
  {
    useLocalStore.setState(() => ({ themePreference: "dark" }));

    const { getByLabelText } = render(
      <SharedStoreProvider room={uuidv4()}>
        <ControlPanel />
      </SharedStoreProvider>
    );

    fireEvent.click(getByLabelText("Light"));

    expect(useLocalStore.getState().themePreference).toBe("light");
  });

  it("Sets theme to dark when dark theme is clicked.", () =>
  {
    useLocalStore.setState(() => ({ themePreference: "light" }));

    const { getByLabelText } = render(
      <SharedStoreProvider room={uuidv4()}>
        <ControlPanel />
      </SharedStoreProvider>
    );

    fireEvent.click(getByLabelText("Dark"));

    expect(useLocalStore.getState().themePreference).toBe("dark");
  });
});