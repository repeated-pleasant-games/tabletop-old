import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { useSharedStore } from "~/store/shared";

import Tabletop, { Tabletop as DisconnectedTabletop } from "./Tabletop";
import { tokenTestId } from "./Token";
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
          id: "",
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

      for (var actor of actorList)
        useSharedStore.setState(
          (state) =>
          ({
            actors: [
              ...state.actors,
              actor
            ]
          })
        );

      const { queryAllByTestId } = render(
        <Tabletop grid={null} />
      );

      expect(queryAllByTestId(tokenTestId).length).toBe(expectedTokenCount);
    }
  );
});