import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { v4 as uuidv4 } from "uuid";

import { renderSVG } from "@/test/render-svg";

import { SharedStoreProvider, useSharedStore } from "@/context/SharedStore";
import { Actor } from "@/feature/actor";
import { tokenTestId } from "@/feature/tabletop";

import { Actors } from "./Actors";

describe("Actors", () =>
{
  it("Should render a Token for each actor in shared state.", () =>
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
});