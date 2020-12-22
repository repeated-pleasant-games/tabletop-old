import * as React from "react";
import { connect } from "react-redux";

import { setViewTransform } from "~/actions/tabletop";
import { Transform, transformTranslation } from "~/core/Transform";

type GridProps = React.HTMLAttributes<{}> &
{
  patternId: string,
  viewTransform?: Transform,
  setViewTransform?: (x: number, y: number) => void,
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
            const [ curX, curY ] = transformTranslation.get(viewTransform);

            setViewTransform(
              curX + (clientX - lastPointerPosition[0]),
              curY + (clientY - lastPointerPosition[1]));

            setPrevPointerPosition([ clientX, clientY ]);
          }
        }
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

const stateToProps = ({ viewTransform }: { viewTransform: Transform }) =>
({
  viewTransform,
});

const dispatchToProps = (dispatch: any) =>
({
  setViewTransform: (x: number, y: number) =>
    dispatch(setViewTransform(x, y)),
});

export default connect(stateToProps, dispatchToProps)(Grid);