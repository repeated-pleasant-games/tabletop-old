import * as React from "react";
import { connect } from "react-redux";

import { setViewTransform } from "~/actions/tabletop";
import { scaleBy, Transform, translateBy } from "~/core/Transform";

type GridProps = React.HTMLAttributes<{}> &
{
  patternId: string,
  viewTransform?: Transform,
  setViewTransform?: (transform: Transform) => void,
};

export const gridTestId = "grid-rect";

export const Grid = ({
  patternId,
  viewTransform,
  setViewTransform
}: GridProps) =>
{
  const [ focusedPointerId, setFocusedPointerId ] = React.useState(-1);
  const resetFocusedPointerId = () => setFocusedPointerId(-1);

  const [ lastPointerPosition, setPrevPointerPosition ] =
    React.useState<[ number, number ]>([ 0, 0 ]);

  return (
    <rect
      data-testid={gridTestId}
      width="100%"
      height="100%"
      fill={ patternId === null ? "none" : `url(#${patternId})` }

      onPointerDown={
        ({ pointerId, clientX, clientY }) => {
          if (focusedPointerId === -1)
          {
            setFocusedPointerId(pointerId);
            setPrevPointerPosition([ clientX, clientY ])
          }
        }
      }

      onPointerMove={
        ({ pointerId, clientX, clientY }) =>
        {
          if (pointerId === focusedPointerId)
          {
            setViewTransform(
              translateBy(
                [
                  clientX - lastPointerPosition[0],
                  clientY - lastPointerPosition[1]
                ],
                viewTransform));

            setPrevPointerPosition([ clientX, clientY ]);
          }
        }
      }

      onPointerUp={
        ({ pointerId }) =>
        {
          if (pointerId === focusedPointerId)
            resetFocusedPointerId();
        }
      }

      onWheel={
        ({ deltaY }) =>
        {
          const factor = Math.floor(Math.abs(deltaY) / 10);

          setViewTransform(
            scaleBy(
              Math.sign(deltaY) >= 0 ? factor : (1/factor),
              viewTransform
            )
          );
        }
      }
    />
  );
};

const stateToProps = ({ viewTransform }: { viewTransform: Transform }) =>
({
  viewTransform,
});

const dispatchToProps = (dispatch: any) =>
({
  setViewTransform: (transform: Transform) =>
    dispatch(setViewTransform(transform)),
});

export default connect(stateToProps, dispatchToProps)(Grid);