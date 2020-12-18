import * as React from "react";
import { connect } from "react-redux";

export const rectangularPatternTestId = "rectangular-grid-pattern";
export const patternTestId = "grid-pattern";

type RectangularGridPatternProps = React.HTMLAttributes<{}> &
{
  cellSize: number,
  viewTransform?: number[]
};

export const RectangularGridPattern = (
  { id, cellSize, viewTransform }: RectangularGridPatternProps
) =>
(
  <defs data-testid={rectangularPatternTestId}>
    <pattern
      data-testid={patternTestId}
      id={id}
      width={cellSize}
      height={cellSize}
      patternUnits="userSpaceOnUse"
      patternTransform={`matrix(${viewTransform?.join(",")})`}
    >
      <path
        className="day grid-pattern"
        d={`M ${cellSize} 0 L 0 0 0 ${cellSize} ${cellSize} ${cellSize}`}
        strokeWidth="1"
      />
    </pattern>
  </defs>
);

const stateToProps = ({ viewTransform }: { viewTransform: number[] }) =>
({
  viewTransform
});

export default connect(stateToProps)(RectangularGridPattern);