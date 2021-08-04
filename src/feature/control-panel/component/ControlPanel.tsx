import React from "react";
import { Box, Container, css, useColorModeValue } from "@chakra-ui/react";

import { ActorPanel } from "@/feature/actor";
import { SnapToGrid } from "@/feature/grid-snap";
import { ThemeSelect } from "@/feature/theme-select";

export const controlPanelTestId = "control-panel";

export const ControlPanel = () =>
{
  const bg = useColorModeValue("white", "gray.800");

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
      `}
    >
      <Box bg={bg} p={4} borderRadius="sm">
        <Box as={"section"}>
          <ActorPanel />
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