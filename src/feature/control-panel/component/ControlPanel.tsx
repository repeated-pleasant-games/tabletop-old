import React from "react";

import { ActorPanel } from "@/feature/actor";
import { SnapToGrid } from "@/feature/grid-snap";
import ThemeSelect from "./ThemeSelect";

import "./ControlPanel.module.css";

export const controlPanelTestId = "control-panel";

export const ControlPanel = () =>
(
  <div className="control-panel" data-testid={controlPanelTestId}>
    <section>
      <ActorPanel />
    </section>
    <section>
      <SnapToGrid />
    </section>
    <section>
      <ThemeSelect />
    </section>
  </div>
);

export default ControlPanel;