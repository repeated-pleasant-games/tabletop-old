import React from "react";

export const Cursor = ({ x, y }: { x: number, y: number}) =>
(
  <rect
    x={x} y={y}
    width={10}
    height={10}
    fill={"red"}
  />
);