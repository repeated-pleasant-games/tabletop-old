import React, { useEffect } from "react";
import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect";

import { v4 as uuidv4 } from "uuid";

import { SharedStoreProvider, useSharedStoreApi } from "@/feature/store-shared";
import { Actor } from "@/feature/actor";

import { ActorList } from "./ActorList";

describe("ActorList", () =>
{
  it("Shows 'no actors' when there are no actors.", () =>
  {
    const { getByText, } = render(
      <SharedStoreProvider room={uuidv4()}>
        <ActorList />
      </SharedStoreProvider>
    );

    expect(getByText(/no actors/i)).toBeInTheDocument();
  });

  it("Shows an entry for each actor.", () =>
  {
    const Fixture = () =>
    {
      const storeApi = useSharedStoreApi();

      useEffect(
        () =>
        {
          storeApi.setState({
            actors: [
              {
                id: "1",
                name: "Alice",
                initiative: 12 
              } as Actor,
            ]
          })
        },
        [storeApi]
      );

      return (
        <>
          <ActorList />
        </>
      )
    };

    const { getByText, } = render(
      <SharedStoreProvider room={uuidv4()}>
        <Fixture />
      </SharedStoreProvider>
    );

    expect(getByText(/alice/i)).toBeInTheDocument();
    expect(getByText(/12/i)).toBeInTheDocument();
  });
});