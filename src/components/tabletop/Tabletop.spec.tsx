import * as React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { actors } from "~/reducers/tabletop";

import Tabletop, { Tabletop as DisconnectedTabletop } from "./Tabletop";
import { tokenTestId } from "./Token";
import { addActor } from "~/actions/tabletop";
import { Actor } from "~/core/Actor";

describe("Disconnected Tabletop component", () =>
{
  it("Renders an SVG component.", () =>
  {
    const { container } = render(<DisconnectedTabletop grid={null} />);

    expect(container.firstChild.nodeName).toBe("svg");
  });

  it("Has an id of 'tabletop'.", () =>
  {
    const { container } = render(<DisconnectedTabletop grid={null} />);

    expect(container.firstChild).toHaveAttribute("id", "tabletop");
  });

  it("Renders the Grid component passed to it.", () =>
  {
    const Grid = () => (<rect data-testid="grid" />);

    const { getByTestId } = render(<DisconnectedTabletop grid={<Grid />} />);

    expect(getByTestId("grid")).toBeInTheDocument();
  });
});

describe("Connected Tabletop component", () =>
{
  it.each([
    [ [], 0 ],
    [
      [
        {
          id: 0,
          name: "",
          initiative: 0,
          x: 0,
          y: 0,
        } as Actor
      ],
      1
    ]
  ])(
    "Has a number of Tokens equal to the number of Actors in the app store",
    (actorList, expectedTokenCount) =>
    {
      const store = createStore(combineReducers({ actors }));

      for (var actor of actorList)
        store.dispatch(addActor(actor));

      const { queryAllByTestId } = render(
        <Provider store={store}>
          <Tabletop grid={null} />
        </Provider>
      );

      expect(queryAllByTestId(tokenTestId).length).toBe(expectedTokenCount);
    }
  );
});