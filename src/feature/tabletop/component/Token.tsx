import * as React from "react";
import { apply, identityTransform, inverseOf, toSvgMatrix } from "@/lib/Transform";
import { useLocalStore } from "@/hook/useLocalStore";
import { useColorModeValue } from "@chakra-ui/react";

export const tokenTestId = "token";

type TokenProps =
{
  x: number,
  y: number,
  setPosition: (x: number, y: number) => void,
  cellSize: number,
  label?: string,
}

export const Token = ({
  x,
  y,
  setPosition,
  cellSize,
  label,
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

  const fill = useColorModeValue(
    "var(--rpg-colors-gray-900)",
    "var(--rpg-colors-gray-300)"
  );

  const [ isDragging, setDragging ] = React.useState(false);
  const [ [ dX, dY ], setDelta ] = React.useState([ 0, 0 ]);

  const snap = (value: number) =>
    Math.floor(value / cellSize) * cellSize;

  return (
    <g
      fill={fill}
      transform={viewTransform && toSvgMatrix(viewTransform)}
    >
      <rect
        data-testid={tokenTestId}

        className="token"

        x={x}
        y={y}
        width={cellSize}
        height={cellSize}

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
      {
        label
        ? (<text x={x} y={y}>{label}</text>)
        : null
      }
    </g>
  );
};

export default Token;