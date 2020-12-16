import * as React from "react";
import { connect } from "react-redux";

import { setViewTransform } from "~/actions/tabletop";

type GridProps = React.HTMLAttributes<{}> &
{
  patternId: string,
  setViewTransform?: (x: number, y: number) => void
};

export const gridTestId = "grid-rect";

export const Grid = ({ patternId, setViewTransform }: GridProps) =>
{
  const [ focusedPointerId, setFocusedPointerId ] = React.useState(-1);

  const resetFocusedPointerId = () => setFocusedPointerId(-1);

  return (
    <rect
      data-testid={gridTestId}
      width="100%"
      height="100%"
      fill={ patternId === null ? "none" : `url(#${patternId})` }

      onPointerDown={
        ({ pointerId }) =>
          focusedPointerId === -1
          ? setFocusedPointerId(pointerId)
          : null
      }

      onPointerMove={
        ({ clientX, clientY, pointerId }) =>
          pointerId === focusedPointerId
          ? setViewTransform(clientX, clientY)
          : null
      }

      onPointerUp={
        ({ pointerId }) =>
          pointerId === focusedPointerId
          ? resetFocusedPointerId()
          : null
      }
    />
  );
};

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