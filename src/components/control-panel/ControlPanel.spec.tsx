import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { v4 as uuidv4 } from "uuid";

import { useSharedStoreFactory, SharedState } from "~/store/shared";
import { UseStore } from "zustand";
import { useLocalStore } from "~/store/local";

import ControlPanel from "./ControlPanel";
import { SharedStoreContext } from "~/App";
import { act } from "react-dom/test-utils";

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
  let useSharedStore: UseStore<SharedState>;

  beforeEach(() =>
  {
    useLocalStore.setState(() => ({ room: uuidv4() }));
    useSharedStore = useSharedStoreFactory(useLocalStore.getState().room);
  });

  afterEach(() =>
  {
    useLocalStore.setState(() => ({ room: "" }));
  });

  it("Adds an actor to app store when 'Add Actor' is pressed.", () =>
  {
    act(() =>
    {
      useSharedStore.setState(() => ({ actors: [] }));
    });

    const { getByText } = render(
      <SharedStoreContext.Provider value={useSharedStore}>
        <ControlPanel />
      </SharedStoreContext.Provider>
    );

    fireEvent.click(getByText("Add Actor"));

    expect(useSharedStore.getState().actors.length).toBe(1);
  });

  it("Shows a list of actors when there is an actor in the store.", () =>
  {
    useSharedStore.getState().addActor({
      id: "",
      name: "Actor 1",
      initiative: 0,
      x: 0,
      y: 0
    })

    const { getByText } = render(
      <SharedStoreContext.Provider value={useSharedStore}>
        <ControlPanel />
      </SharedStoreContext.Provider>
    );

    expect(getByText("Actor 1")).toBeInTheDocument();
  });

  it.each([
    [
      [
        {
          id: "1",
          name: "Actor 1",
          initiative: 2,
          x: 0,
          y: 0
        },
        {
          id: "2",
          name: "Actor 2",
          initiative: 1,
          x: 0,
          y: 0
        }
      ],
      [
        "Actor 1",
        "Actor 2"
      ]
    ],
    [
      [
        {
          id: "1",
          name: "Actor 1",
          initiative: 10,
          x: 0,
          y: 0
        },
        {
          id: "2",
          name: "Actor 2",
          initiative: 15,
          x: 0,
          y: 0
        }
      ],
      [
        "Actor 2",
        "Actor 1"
      ]
    ]
  ])(
    "Orders actors by their initiative from greatest to least.",
    (testActors, expectedOrder) =>
  {
    useSharedStore.setState(() => ({ actors: [] }));

    for (let actor of testActors)
      useSharedStore.getState().addActor(actor);

    const { getAllByText } = render(
      <SharedStoreContext.Provider value={useSharedStore}>
        <ControlPanel />
      </SharedStoreContext.Provider>
    );

    const entries = getAllByText(/.*/i, { selector: "li" })

    expect(entries.map(
      (entry) => entry.textContent.trim()
    )).toStrictEqual(
      expectedOrder
    );
  });

  it("Removes the actor associated with the clicked initiative entry.", () =>
  {
    useSharedStore.setState(() => ({ actors: [] }));
    useSharedStore.getState().addActor({
      id: "1",
      name: "Actor 1",
      initiative: 0,
      x: 0,
      y: 0
    });

    const { getByText } = render(
      <SharedStoreContext.Provider value={useSharedStore}>
        <ControlPanel />
      </SharedStoreContext.Provider>
    );

    fireEvent.click(getByText("Actor 1"));

    expect(() => getByText("Actor 1")).toThrow();
  });

  it("Enables snap-to-grid when 'Snap to Grid' checkbox is checked.", () =>
  {
    useLocalStore.setState(() => ({ snapToGrid: false }));

    const { getByLabelText } = render(
      <ControlPanel />
    );

    fireEvent.click(getByLabelText("Snap to Grid"));

    expect(useLocalStore.getState().snapToGrid).toBe(true);
  });

  it("Unchecks 'Snap to Grid' when snapToGrid is false.", () =>
  {
    useLocalStore.setState(() => ({ snapToGrid: false }))

    const { getByLabelText } = render(<ControlPanel />);

    expect(getByLabelText("Snap to Grid")).not.toHaveAttribute("checked");
  });

  it("Checks 'Snap to Grid' when snapToGrid is true.", () =>
  {
    useLocalStore.setState(() => ({ snapToGrid: true }));

    const { getByLabelText } = render(<ControlPanel />);

    expect(getByLabelText("Snap to Grid")).toHaveAttribute("checked");
  });

  it("Disables snap-to-grid when 'Snap to Grid' is unchecked.", () =>
  {
    useLocalStore.setState(() => ({ snapToGrid: true }));

    const { getByLabelText } = render(<ControlPanel />);

    fireEvent.click(getByLabelText("Snap to Grid"));

    expect(useLocalStore.getState().snapToGrid).toBe(false);
  });

  it("Checks 'light' theme indicator when theme is set to 'light'.", () =>
  {
    useLocalStore.setState(() => ({ themePreference: 'light' }));

    const { getByLabelText } = render(<ControlPanel />);

    expect((getByLabelText("Light") as HTMLInputElement).checked).toBe(true);
  });

  it("Checks 'dark' theme indicator when theme is set to 'dark'.", () =>
  {
    useLocalStore.setState(() => ({ themePreference: 'dark' }));

    const { getByLabelText } = render(<ControlPanel />);

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

      const { getByLabelText } = render(<ControlPanel />);

      expect((getByLabelText("Light") as HTMLInputElement).checked).toBe(dayState);
      expect((getByLabelText("Dark") as HTMLInputElement).checked).toBe(darkState);
    }
  );

  it("Sets theme to day when day theme is clicked.", () =>
  {
    useLocalStore.setState(() => ({ themePreference: "dark" }));

    const { getByLabelText } = render(<ControlPanel />);

    fireEvent.click(getByLabelText("Light"));

    expect(useLocalStore.getState().themePreference).toBe("light");
  });

  it("Sets theme to dark when dark theme is clicked.", () =>
  {
    useLocalStore.setState(() => ({ themePreference: "light" }));

    const { getByLabelText } = render(<ControlPanel />);

    fireEvent.click(getByLabelText("Dark"));

    expect(useLocalStore.getState().themePreference).toBe("dark");
  });
});