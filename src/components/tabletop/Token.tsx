import * as React from "react";
import { apply, identityTransform, inverseOf, toSvgMatrix } from "~/core/Transform";
import { useLocalStore } from "~/store/local";

export const tokenTestId = "token";

type TokenProps =
{
  x: number,
  y: number,
  cellSize: number,
}

export const Token = ({
  x: _x,
  y: _y,
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
  const [ [ x, y ], setPosition ] = React.useState([ _x, _y ]);
  const [ [ dX, dY ], setDelta ] = React.useState([ 0, 0 ]);

  const snap = (value: number) => Math.floor(value / cellSize) * cellSize;

  return (
    <rect
      data-testid={tokenTestId}

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
            const tokenX = clientX + dX;
            const tokenY = clientY + dY;

            const tokenPosition: [ number, number ] =
              apply(
                inverseOf(viewTransform || identityTransform()),
                [ tokenX, tokenY ]
              )

            setPosition(
              snapToGrid
              ? tokenPosition.map(snap) as [ number, number ]
              : tokenPosition
            );
          }
        }
      }
    />
  );
};

export default Token;