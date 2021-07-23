import React from "react";
import { useSharedStore } from "~/store/shared";
import { v4 as uuid } from "uuid";

import { Button } from "~/components/util/Button";

export const AddActor = () =>
{
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