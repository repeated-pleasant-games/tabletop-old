import * as React from "react";

export const rectangularPatternTestId = "rectangular-grid-pattern";
export const patternTestId = "grid-pattern";

type RectangularGridPatternProps = React.HTMLAttributes<{}>;

export const RectangularGridPattern = (
  { id }: RectangularGridPatternProps
) =>
(
  <defs data-testid={rectangularPatternTestId}>
    <pattern data-testid={patternTestId} id={id}></pattern>
  </defs>
);