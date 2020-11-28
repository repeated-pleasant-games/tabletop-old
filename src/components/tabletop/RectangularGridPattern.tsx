import * as React from "react";

export const rectangularPatternTestId = "rectangular-grid-pattern";
export const patternTestId = "grid-pattern";

type RectangularGridPatternProps = React.HTMLAttributes<{}> &
{
  cellSize: number
};

export const RectangularGridPattern = (
  { id, cellSize }: RectangularGridPatternProps
) =>
(
  <defs data-testid={rectangularPatternTestId}>
    <pattern
      data-testid={patternTestId}
      id={id}
      width={cellSize}
      height={cellSize}
    >
    </pattern>
  </defs>
);