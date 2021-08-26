import React from "react";
import { useColorModeValue } from "@chakra-ui/react";

export const Cursor = ({ x, y }: { x: number, y: number}) =>
{
  const fill = useColorModeValue(
    "var(--rpg-colors-gray-900)",
    "var(--rpg-colors-gray-300)"
  );

  return (
    <g transform={`translate(${x},${y})`}>
      <g
        transform="
          scale(0.025)
          matrix(1.82605,-0.803689,0.803689,1.82605,-531.498,-59.7769)
        "
      >
        <path
          d="
            M 120.099,388.586
            L 231.762,134.739
            L 343.424,388.586
            L 231.762,355.867
            L 120.099,388.586
            Z
          "
          style={{
            fill
          }}
        />
      </g>
    </g>
  );
}