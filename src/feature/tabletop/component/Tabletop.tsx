import * as React from "react";

import { Actors } from "@/feature/actor";
import styled from "@emotion/styled";

const TabletopContainer = styled.svg`
  place-self: start;
  width: 100vw;
  height: 100vh;
`;

type TabletopProps = React.HTMLAttributes<{}> &
{
  grid: React.ReactElement,
};
export const Tabletop = ({ grid, }: TabletopProps) =>
(
  <TabletopContainer>
    {grid}
    <Actors />
  </TabletopContainer>
);

export default Tabletop;