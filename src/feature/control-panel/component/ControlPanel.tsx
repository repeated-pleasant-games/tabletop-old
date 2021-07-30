import React from "react";

import styled from "@emotion/styled";

import { ActorPanel } from "@/feature/actor";
import { SnapToGrid } from "@/feature/grid-snap";
import { ThemeSelect } from "@/feature/theme-select";

export const controlPanelTestId = "control-panel";

const ControlPanelContainer = styled.div`
  align-self: start;
  justify-self: end;

  position: absolute;
  z-index: 1;

  right: 0;
  margin: 1em 1em 0 0;
`;

export const ControlPanel = () =>
(
  <ControlPanelContainer>
    <section>
      <ActorPanel />
    </section>
    <section>
      <SnapToGrid />
    </section>
    <section>
      <ThemeSelect />
    </section>
  </ControlPanelContainer>
);

export default ControlPanel;