import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setSnapToGrid } from "~/actions/tabletop";

import { Checkbox } from "../util/Checkbox";

export const SnapToGrid = ({
  setSnapToGrid = (value: boolean) => null,
  snapToGrid = false
}: {
  setSnapToGrid?: (value: boolean) => void
  snapToGrid?: boolean
}) =>
(
  <Checkbox
    checked={snapToGrid}
    onChecked={() => setSnapToGrid(true)}
    onUnchecked={() => setSnapToGrid(false)}
  >
    Snap to Grid
  </Checkbox>
);

const stateToProps = ({ snapToGrid }: { snapToGrid: boolean }) =>
({
  snapToGrid,
});

const dispatchToProps = (dispatch: Dispatch) =>
({
  setSnapToGrid: (value: boolean) => dispatch(setSnapToGrid(value)),
});

export default connect(stateToProps, dispatchToProps)(SnapToGrid);