import React from "react";

import AddActor from "./AddActor";
import ActorList from "./ActorList";
import SnapToGrid from "./SnapToGrid";
import ThemeSelect from "./ThemeSelect";

export const controlPanelTestId = "control-panel";

export const ControlPanel = () =>
(
  <div className="control-panel" data-testid={controlPanelTestId}>
    <section>
      <AddActor />
    </section>
    <section>
      <ActorList />
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