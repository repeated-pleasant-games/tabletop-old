import React from "react";
import { v4 as uuid } from "uuid";

import { SharedStoreContext } from "~/App";
import { Button } from "~/components/util/Button";

import "./AddActor.module.css";

export const AddActor = () =>
{
  const useSharedStore = React.useContext(SharedStoreContext);

  const addActor = useSharedStore((state) => state.addActor);

  return (
    <>
      <Button
        onClick={
          () => addActor({
            id: uuid(),
            name: "Actor",
            initiative: 0,
            x: 0,
            y: 0,
          })
        }
      >
        Add Actor
      </Button>
    </>
  );
}

export default AddActor;