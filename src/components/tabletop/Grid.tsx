import * as React from "react";
import { connect } from "react-redux";

import { setViewTransform, SetViewTransformPayload } from "~/actions/tabletop";

type GridProps = React.HTMLAttributes<{}> &
{
  patternId: string,
  setViewTransform?: (x: number, y: number) => SetViewTransformPayload
};

export const gridTestId = "grid-rect";

export const Grid = ({ patternId, setViewTransform }: GridProps) => (
  <rect
    data-testid={gridTestId}
    width="100%"
    height="100%"
    fill={ patternId === null ? "none" : `url(#${patternId})` }
    onPointerMove={
      ({ clientX, clientY }) =>
      {
        setViewTransform(clientX, clientY);
      }}
  />
);

const stateToProps = ({ viewTransform }: { viewTransform: number[] }) =>
({
  viewTransform,
});

const dispatchToProps = (dispatch: any) =>
({
  setViewTransform: (x: number, y: number) =>
    dispatch(setViewTransform(x, y)),
});

export default connect(stateToProps, dispatchToProps)(Grid);