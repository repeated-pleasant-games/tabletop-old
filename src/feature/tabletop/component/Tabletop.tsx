import * as React from "react";

import styled from "@emotion/styled";

import {
  ThingProvider,
  useThing,
  useThingAttributeSystem
} from "@/feature/thing-attribute-system";

import { PositionAttribute, NameAttribute } from "../type";
import { Token } from "./Token";

const TabletopContainer = styled.svg`
  place-self: start;
  width: 100vw;
  height: 100vh;
`;

const TokenAdapter = () => 
{
  const { getAttributeByType, updateAttributeOfType } = useThing();

  const { x, y } = getAttributeByType<PositionAttribute>("position");
  const { name } = getAttributeByType<NameAttribute>("name");

  return (
    <Token
      label={name}
      x={x} y={y}
      cellSize={16}
      setPosition={
        (x, y) =>
          updateAttributeOfType<PositionAttribute>("position", { x, y, })
      }
    />
  )
};

type TabletopProps = React.HTMLAttributes<{}> &
{
  grid: React.ReactElement,
};
export const Tabletop = ({ grid, }: TabletopProps) =>
{
  const { getThingsWithAttributeTypes, } = useThingAttributeSystem();

  const thingIds = React.useMemo(
    () =>
      getThingsWithAttributeTypes<[
        PositionAttribute,
        NameAttribute
      ]>(
        "position",
        "name"
      ),
    [ getThingsWithAttributeTypes ]
  );

  return (
    <TabletopContainer>
      {grid}
      {
        thingIds.map(
          (id) =>
          (
            <ThingProvider key={id} thingId={id}>
              <TokenAdapter />
            </ThingProvider>
          )
        )
      }
    </TabletopContainer>
  );
}

export default Tabletop;