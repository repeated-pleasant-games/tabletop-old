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
  const [ prevPointerId, setPrevPointerId ] = React.useState(-1);

  return (
    <rect
      data-testid={gridTestId}
      width="100%"
      height="100%"
      fill={ patternId === null ? "none" : `url(#${patternId})` }

      onPointerDown={({ pointerId }) => setPrevPointerId(pointerId)}

      onPointerMove={
        ({ clientX, clientY, pointerId }) =>
          pointerId === prevPointerId
          ? setViewTransform(clientX, clientY)
          : null
      }

      onPointerUp={
        ({ pointerId }) =>
          pointerId === prevPointerId
          ? setPrevPointerId(-1)
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