import * as React from "react";
import { apply, identityTransform, inverseOf, toSvgMatrix } from "@/lib/Transform";
import { useLocalStore } from "@/hook/useLocalStore";

export const tokenTestId = "token";

type TokenProps =
{
  x: number,
  y: number,
  setPosition: (x: number, y: number) => void,
  cellSize: number,
}

export const Token = ({
  x,
  y,
  setPosition,
  cellSize,
}: TokenProps) =>
{
  const {
    viewTransform,
    snapToGrid,
  } = useLocalStore((state) =>
    ({
      "viewTransform": state.viewTransform,
      "snapToGrid": state.snapToGrid,
    }));

  const [ isDragging, setDragging ] = React.useState(false);
  const [ [ dX, dY ], setDelta ] = React.useState([ 0, 0 ]);

  const snap = (value: number) =>
    Math.floor(value / cellSize) * cellSize;

  return (
    <rect
      data-testid={tokenTestId}

      className="token"

      x={x}
      y={y}
      width={cellSize}
      height={cellSize}

      transform={viewTransform && toSvgMatrix(viewTransform)}

      onPointerDown={
        ({ button, target, pointerId, clientX, clientY }) =>
        {
          if (button === 0)
          {
            (target as Element).setPointerCapture(pointerId);

            const [ viewX, viewY ] = apply(
                viewTransform || identityTransform(),
                [ x, y ]
              );

            setDelta([ viewX - clientX, viewY - clientY ]);
            setDragging(true);
          }
        }
      }
      onPointerUp={
        ({ button, target, pointerId }) =>
        (
          button === 0 &&
          (
            (target as Element).releasePointerCapture(pointerId),
            setDelta([ 0, 0 ]),
            setDragging(false)
          )
        )
      }

      onPointerMove={
        ({ clientX, clientY }) =>
        {
          if (isDragging)
          {
            const tokenX = clientX + (snapToGrid ? 0 : dX);
            const tokenY = clientY + (snapToGrid ? 0 : dY);

            const tokenPosition: [ number, number ] =
              apply(
                inverseOf(viewTransform || identityTransform()),
                [ tokenX, tokenY ]
              );

            const [ x, y ] =
                snapToGrid
                ? tokenPosition.map(snap) as [ number, number ]
                : tokenPosition

            setPosition(x, y);
          }
        }
      }
    />
  );
};

export default Token;