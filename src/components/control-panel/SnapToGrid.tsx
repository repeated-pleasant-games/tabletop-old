import React from "react";
import { useLocalStore } from "~/store/local";

import { Checkbox } from "../util/Checkbox";

export const SnapToGrid = () =>
{
  const { snapToGrid, setSnapToGrid } = useLocalStore(
    ({ snapToGrid, setSnapToGrid }) =>
    ({
      snapToGrid,
      setSnapToGrid,
    })
  );

  return (
    <Checkbox
      checked={snapToGrid}
      onChecked={() => setSnapToGrid(true)}
      onUnchecked={() => setSnapToGrid(false)}
    >
      Snap to Grid
    </Checkbox>
  );
};

export default SnapToGrid;