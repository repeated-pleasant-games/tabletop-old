import React from "react";
import { Box, Button, Container, css, useColorModeValue } from "@chakra-ui/react";

import { SnapToGrid } from "@/feature/grid-snap";
import { ThemeSelect } from "@/feature/theme-select";
import { useThingAttributeSystem } from "@/feature/thing-attribute-system";

import { PositionAttribute, NameAttribute } from "@/feature/tabletop";

export const controlPanelTestId = "control-panel";

export const ControlPanel = () =>
{
  const bg = useColorModeValue("white", "gray.800");

  const { createThing, addAttributeToThing } = useThingAttributeSystem();

  const createToken = React.useCallback(
    () =>
    {
      const thing = createThing();
      addAttributeToThing<PositionAttribute>(
        thing,
        {
          type: 'position',
          x: 0,
          y: 0
        }
      );
      addAttributeToThing<NameAttribute>(
        thing,
        {
          type: 'name',
          name: 'Actor'
        }
      );
    },
    [createThing]
  );

  return (
    <Container
      data-testid={controlPanelTestId}
      css={css`
        align-self: start;
        justify-self: end;

        position: absolute;
        z-index: 1;

        top: 0;
        right: 0;
        margin: 1em 1em 0 0;

        max-width: 400px;
      `}
    >
      <Box bg={bg} p={4} borderRadius="sm">
        <Box as={"section"}>
          <Button onClick={createToken}>Add Token</Button>
        </Box>
        <Box as={"section"} mt="4">
          <SnapToGrid />
        </Box>
        <Box as={"section"} mt="4">
          <ThemeSelect />
        </Box>
      </Box>
    </Container>
  );
}

export default ControlPanel;