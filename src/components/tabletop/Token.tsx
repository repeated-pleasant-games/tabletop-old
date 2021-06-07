import * as React from "react";
import { connect } from "react-redux";
import { apply, identityTransform, inverseOf, toSvgMatrix, Transform } from "~/core/Transform";

export const tokenTestId = "token";

type TokenProps =
{
  x: number,
  y: number,
  cellSize: number,
  viewTransform?: Transform,
}

export const Token = ({
  x: _x,
  y: _y,
  cellSize,
  viewTransform
}: TokenProps) =>
{
  const [ isDragging, setDragging ] = React.useState(false);
  const [ [ x, y ], setPosition ] = React.useState([ _x, _y ]);
  const [ [ dX, dY ], setDelta ] = React.useState([ 0, 0 ]);

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
          isDragging && setPosition(
            apply(
              inverseOf(viewTransform || identityTransform()),
              [ clientX + dX, clientY + dY ]
            )
          )
      }
    />
  );
};

const stateToProps = ({ viewTransform }: { viewTransform: Transform }) =>
({
  viewTransform,
});

export default connect(stateToProps)(Token);