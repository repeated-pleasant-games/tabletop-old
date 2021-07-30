import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { v4 as uuidv4 } from "uuid";

import { renderSVG } from "@/test/render-svg";

import { SharedStoreProvider } from "@/context/SharedStore";
import { useSharedStore } from "@/hook/useSharedStore";
import { Actor } from "@/feature/actor";
import { tokenTestId } from "@/feature/tabletop";

import { Actors } from "./Actors";

describe("Actors", () =>
{
  it("Renders a Token for each actor in shared state.", () =>
  {
    const Fixture = (): any =>
    {
      const { addActor } = useSharedStore((state) =>
      ({
        addActor: state.addActor,
      }));

      React.useEffect(
        () =>
        {
          addActor({ id: uuidv4(), name: "Actor", } as Actor);
        },
        []
      );

      return ( null );
    };

    const { getAllByTestId } = renderSVG(
      <SharedStoreProvider room={uuidv4()}>
        <Fixture />
        <Actors />
      </SharedStoreProvider>
    );

    expect(getAllByTestId(tokenTestId)).toHaveLength(1);
  });

  it("Gives each token a label equal to actor name", () =>
  {
    const Fixture = (): any =>
    {
      const { addActor } = useSharedStore((state) =>
      ({
        addActor: state.addActor,
      }));

      React.useEffect(
        () =>
        {
          addActor({ id: uuidv4(), name: "Actor", } as Actor);
        },
        []
      );

      return ( null );
    };

    const { getByText } = renderSVG(
      <SharedStoreProvider room={uuidv4()}>
        <Fixture />
        <Actors />
      </SharedStoreProvider>
    );

    expect(getByText(/actor/i)).toBeInTheDocument();
  });
});