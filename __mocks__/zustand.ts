import actualCreate, { StateCreator, SetState, StoreApi, State } from "zustand";
import { act } from "@testing-library/react";

const storeResetCallbacks = new Set<() => void>();

const mockCreate = <T extends State>(
  createState: StateCreator<T, SetState<T>> | StoreApi<T>
) =>
{
  const store = actualCreate(createState);

  const initialState = store.getState();

  storeResetCallbacks.add(() => store.setState(initialState, true));

  return store;
};

afterEach(() =>
{
  act(() =>
  {
    storeResetCallbacks.forEach(
      (callback) => callback()
    );
  });
});

export default mockCreate;
