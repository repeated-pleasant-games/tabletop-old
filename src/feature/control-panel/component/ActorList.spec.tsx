import React from "react";
import { UseStore } from "zustand";

import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { useUseSharedStore, SharedState } from "@/context/SharedStore";
import { Actor } from "@/lib/Actor";

import ActorList, { actorListItemTestId, } from "./ActorList";

describe("Connected ActorList", () =>
{
  let useSharedStore: UseStore<SharedState>;

  beforeEach(() =>
  {
    useSharedStore = useUseSharedStore();
  });

  it("Displays 'no actors' when there are no actors in state.", () =>
  {
    useSharedStore.setState(() => ({ actors: [] }));

    const { getByText } = render(<ActorList />);

    expect(getByText(/no actors/i)).toBeInTheDocument();
  });

  it.each([
    [
      [ 1, ]
    ],
    [
      [ 1, 2, ]
    ], 
    [
      [ 1, 2, 3, 4, ]
    ] 
  ])("Renders an <li> for each actor in state.", (actorList: number[]) =>
  {
    useSharedStore.setState(() => ({ actors: [] }));

    for (let actorNumber of actorList)
      useSharedStore.getState().addActor({ id: `${actorNumber}` } as Actor);

    const { getAllByTestId } = render(<ActorList />);

    expect(getAllByTestId(actorListItemTestId)).toHaveLength(actorList.length);
  });

  it("Displays the name of the actor for each <li>.", () =>
  {
    useSharedStore.setState(() => ({ actors: [] }));
    useSharedStore.getState().addActor({ id: `1`, name: `Actor 1` } as Actor);

    const { queryByText } = render(<ActorList />);

    expect(queryByText("Actor 1")).toBeInTheDocument();
  });

  it("Displays Actors sorted from highest initiative to lowest.", () =>
  {
    useSharedStore.setState(() => ({ actors: [] }));
    useSharedStore.getState().addActor({ id: `1`, name: `Actor 1`, initiative: 1 } as Actor);
    useSharedStore.getState().addActor({ id: `2`, name: `Actor 2`, initiative: 2 } as Actor);

    const { getAllByTestId } = render(<ActorList />);

    expect(getAllByTestId(actorListItemTestId)[0]).toHaveTextContent("Actor 2");
    expect(getAllByTestId(actorListItemTestId)[1]).toHaveTextContent("Actor 1");
  });

  it("Removes an actor from the store when an <li> is clicked.", () =>
  {
    useSharedStore.setState(() => ({ actors: [] }));

    useSharedStore.getState().addActor({ id: "1", name: "Actor 1", initiative: 2 } as Actor);
    useSharedStore.getState().addActor({ id: "2", name: "Actor 2", initiative: 1 } as Actor);

    const { getAllByTestId } = render(<ActorList />);

    fireEvent.click(getAllByTestId(actorListItemTestId)[0]);

    expect(getAllByTestId(actorListItemTestId)).toHaveLength(1);
    expect(getAllByTestId(actorListItemTestId)[0]).toHaveTextContent("Actor 2");
  });
});