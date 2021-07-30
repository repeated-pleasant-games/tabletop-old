import React from "react";
import { Box, Container, css } from "@chakra-ui/react";

import { ActorPanel } from "@/feature/actor";
import { SnapToGrid } from "@/feature/grid-snap";
import { ThemeSelect } from "@/feature/theme-select";

export const controlPanelTestId = "control-panel";

export const ControlPanel = () =>
(
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
    <Box bg="white" p={4} borderRadius="sm">
      <section>
        <ActorPanel />
      </section>
      <section>
        <SnapToGrid />
      </section>
      <section>
        <ThemeSelect />
      </section>
    </Box>
  </Container>
);

export default ControlPanel;