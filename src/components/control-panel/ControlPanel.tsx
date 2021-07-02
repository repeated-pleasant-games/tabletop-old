import React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { v4 as uuid } from "uuid";

import { addActor, removeActor, setSnapToGrid } from "~/actions/tabletop";
import { Actor } from "~/core/Actor";
import { setThemePreference } from "~/actions/app";
import { Button } from "../util/Button";
import { Checkbox } from "../util/Checkbox";
import { Radio } from "../util/Radio";
import AddActor from "./AddActor";
import ActorList from "./ActorList";

export const controlPanelTestId = "control-panel";

type ControlPanelProps =
{
  removeActor?: (id: string) => void,
  setSnapToGrid?: (snapToGrid: boolean) => void,
  setThemePreference?: (theme: string) => void,
  actors?: Actor[],
  snapToGrid?: boolean,
  themePreference?: string,
};

export const ControlPanel = ({
  removeActor,
  setSnapToGrid,
  setThemePreference,
  actors,
  snapToGrid,
  themePreference,
}: ControlPanelProps) =>
(
  <div className="control-panel" data-testid={controlPanelTestId}>
    <section>
      <AddActor />
    </section>
    <section>
      <ActorList />
    </section>
    <section>
      <Checkbox
        checked={snapToGrid}
        onChecked={() => setSnapToGrid(true)}
        onUnchecked={() => setSnapToGrid(false)}
      >
        Snap to Grid
      </Checkbox>
    </section>
    <section>
      <Radio name="set-theme" onChange={setThemePreference}>
        <Radio.Option value="light" checked={themePreference === "light"}>Light</Radio.Option>
        <Radio.Option value="system" checked={themePreference === "system"}>System</Radio.Option>
        <Radio.Option value="dark" checked={themePreference === "dark"}>Dark</Radio.Option>
      </Radio>
    </section>
  </div>
);

const stateToProps = ({
  actors,
  snapToGrid,
  themePreference,
}: {
  actors: Actor[],
  snapToGrid: boolean,
  themePreference: string,
}) =>
({
  actors,
  snapToGrid,
  themePreference,
});

const dispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) =>
({
  removeActor: (id: string) => dispatch(removeActor(id)),
  setSnapToGrid: (snapToGrid: boolean) => dispatch(setSnapToGrid(snapToGrid)),
  setThemePreference: (theme: string) => dispatch(setThemePreference(theme)),
});

export default connect(stateToProps, dispatchToProps)(ControlPanel);
