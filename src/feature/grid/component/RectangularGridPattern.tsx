import * as React from "react";
import styled from "@emotion/styled";

import { useLocalStore } from "@/hook/useLocalStore";
import { getScale, inverseOf, toSvgMatrix } from "@/lib/Transform";
import { useColorModeValue } from "@chakra-ui/react";

export const rectangularPatternTestId = "rectangular-grid-pattern";
export const patternTestId = "grid-pattern";

type RectangularGridPatternProps = React.HTMLAttributes<{}> &
{
  cellSize: number,
};

const Path = styled.path`
  fill: none;
  stroke: #111111;
`;

export const RectangularGridPattern = (
  { id, cellSize }: RectangularGridPatternProps
) =>
{
  const viewTransform = useLocalStore((state) => state.viewTransform);

  const stroke = useColorModeValue(
    "var(--rpg-colors-gray-700)",
    "var(--rpg-colors-gray-500)"
  );

  return (
    <defs data-testid={rectangularPatternTestId}>
      <pattern
        data-testid={patternTestId}
        id={id}
        width={cellSize}
        height={cellSize}
        patternUnits="userSpaceOnUse"
        patternTransform={
          viewTransform
          ? toSvgMatrix(viewTransform)
          : ""}
      >
        <path
          stroke={stroke}
          fill="none"
          d={`M ${cellSize} 0 L 0 0 0 ${cellSize} ${cellSize} ${cellSize}`}
          strokeWidth={1 * getScale(inverseOf(viewTransform))[0]}
        />
      </pattern>
    </defs>
  );
};

export default RectangularGridPattern;