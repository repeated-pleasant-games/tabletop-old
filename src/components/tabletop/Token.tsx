import * as React from "react";
import { connect } from "react-redux";
import { apply, inverseOf, toSvgMatrix, Transform } from "~/core/Transform";

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

  return (
    <rect
      data-testid={tokenTestId}

      x={x}
      y={y}
      width={cellSize}
      height={cellSize}

      transform={viewTransform && toSvgMatrix(viewTransform)}

      onPointerDown={({ button }) => setDragging(button === 0)}
      onPointerUp={({ button }) => setDragging(!(button === 0))}
      onPointerMove={
        ({ clientX, clientY }) =>
          isDragging && setPosition(
            viewTransform
            ? apply(inverseOf(viewTransform), [ clientX, clientY ])
            : [ clientX, clientY ]
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