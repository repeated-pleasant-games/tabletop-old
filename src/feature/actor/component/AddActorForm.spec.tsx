import React from "react";
import { fireEvent, render, waitFor, } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

jest.mock(
  "uuid",
  () =>
  ({
    v4: () => "1",
  })
);

import { v4 as uuidv4 } from "uuid";

import { SharedStoreProvider } from "@/context/SharedStore";
import { useSharedStoreApi } from "@/hook/useSharedStore";

import AddActorForm from "./AddActorForm";

describe("AddActorForm", () =>
{
  it("Calls addActor when submitted", async () =>
  {
    const addActor = jest.fn();

    const Fixture = () =>
    {
      const storeApi = useSharedStoreApi();

      React.useEffect(
        () =>
        {
          storeApi.setState({ addActor });
        },
        [storeApi]
      );

      return (
        <>
          <AddActorForm />
        </>
      )
    };

    const { getByLabelText, getByText } = render(
      <SharedStoreProvider room={uuidv4()}>
        <Fixture />
      </SharedStoreProvider>
    );

    userEvent.type(getByLabelText(/actor name/i), "Alice");
    fireEvent.click(getByText(/add actor/i));

    await waitFor(() =>
    {
      expect(addActor).toBeCalledWith({
        id: "1",
        initiative: 0,
        name: "Alice",
        x: 0,
        y: 0,
      });
    });
  });
});