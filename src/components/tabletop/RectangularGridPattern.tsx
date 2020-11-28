import * as React from "react";

export const rectangularPatternTestId = "rectangular-grid-pattern";
export const patternTestId = "grid-pattern";

type RectangularGridPatternProps = React.HTMLAttributes<{}> &
{
  patternId: string,
}

export const RectangularGridPattern = (
  { patternId }: RectangularGridPatternProps
) =>
(
  <defs data-testid={rectangularPatternTestId}>
    <pattern data-testid={patternTestId} id={patternId}></pattern>
  </defs>
);