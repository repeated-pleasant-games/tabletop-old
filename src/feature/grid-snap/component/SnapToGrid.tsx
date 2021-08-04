import React from "react";
import { useLocalStore } from "@/hook/useLocalStore";

import { Checkbox } from "@chakra-ui/react";

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
      isChecked={snapToGrid}
      onChange={({ target: { checked } }) => setSnapToGrid(checked)}
    >
      Snap to Grid
    </Checkbox>
  );
};

export default SnapToGrid;