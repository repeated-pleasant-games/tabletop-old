import React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { actors } from "~/reducers/tabletop";
import { addActor } from "~/actions/tabletop";
import { Actor } from "~/core/Actor";

import ActorList, {
  ActorList as DisconnectedActorList,
  actorListItemTestId,
  actorListTestId
} from "./ActorList";

describe("Disconnected ActorList", () =>
{
  it("Is a <ul> element.", () =>
  {
    const { getByTestId } = render(
      <DisconnectedActorList />
    );

    expect(getByTestId(actorListTestId).tagName.toLowerCase()).toBe("ul");
  });
});

describe("Connected ActorList", () =>
{
  it("Is empty when there are no actors in state.", () =>
  {
    const store = createStore(combineReducers({ actors }));

    const { queryAllByTestId } = render(
      <Provider store={store}>
        <ActorList />
      </Provider>
    );

    expect(queryAllByTestId(actorListItemTestId)).toHaveLength(0);
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
    const store = createStore(combineReducers({ actors }));

    for (let actorNumber of actorList)
    {
      store.dispatch(
        addActor({ id: `${actorNumber}` } as Actor)
      );
    }

    const { getAllByTestId } = render(
      <Provider store={store}>
        <ActorList />
      </Provider>
    );

    expect(getAllByTestId(actorListItemTestId)).toHaveLength(actorList.length);
  });

  it("Displays the name of the actor for each <li>.", () =>
  {
    const store = createStore(combineReducers({ actors }));
    store.dispatch(addActor({ id: `1`, name: `Actor 1` } as Actor));

    const { getByText } = render(
      <Provider store={store}>
        <ActorList />
      </Provider>
    );

    expect(getByText("Actor 1")).toBeInTheDocument();
  });

  it("Displays Actors sorted from highest initiative to lowest.", () =>
  {
    const store = createStore(combineReducers({ actors }));
    store.dispatch(addActor({ id: `1`, name: `Actor 1`, initiative: 1 } as Actor));
    store.dispatch(addActor({ id: `2`, name: `Actor 2`, initiative: 2 } as Actor));

    const { getAllByTestId } = render(
      <Provider store={store}>
        <ActorList />
      </Provider>
    );

    expect(getAllByTestId(actorListItemTestId)[0]).toHaveTextContent("Actor 2");
    expect(getAllByTestId(actorListItemTestId)[1]).toHaveTextContent("Actor 1");
  });

  it("Removes an actor from the store when an <li> is clicked.", () =>
  {
    const store = createStore(combineReducers({ actors }));
    store.dispatch(addActor({ id: `1`, name: `Actor 1`, } as Actor));
    store.dispatch(addActor({ id: `2`, name: `Actor 2`, } as Actor));

    const { getAllByTestId } = render(
      <Provider store={store}>
        <ActorList />
      </Provider>
    );

    fireEvent.click(getAllByTestId(actorListItemTestId)[0]);

    expect(getAllByTestId(actorListItemTestId)).toHaveLength(1);
    expect(getAllByTestId(actorListItemTestId)[0]).toHaveTextContent("Actor 2");
  });
});