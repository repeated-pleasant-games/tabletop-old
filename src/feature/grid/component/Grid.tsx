import * as React from "react";

import { getScale, scale, transformerOf, translateBy, translation } from "@/lib/Transform";
import { useLocalStore } from "@/hook/useLocalStore";

type GridProps = React.HTMLAttributes<{}> &
{
  patternId: string,
};

export const gridTestId = "grid-rect";

export const Grid = ({ patternId, }: GridProps) =>
{
  const { viewTransform, setViewTransform } = useLocalStore(
    ({ viewTransform, setViewTransform }) =>
    ({
      viewTransform,
      setViewTransform,
    })
  );

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
        ({ deltaY, clientX, clientY }) =>
        {
          const [ currentScale, ] = getScale(viewTransform);

          const zoomFactor = 
              Math.max((currentScale + (-deltaY / 1000)) / currentScale, 0.01);

          const zoom = transformerOf(scale(zoomFactor));

          const pan = transformerOf(translation(
            clientX * (1 - zoomFactor),
            clientY * (1 - zoomFactor)
          ));

          setViewTransform(pan(zoom(viewTransform)));
        }
      }
    />
  );
};

export default Grid;