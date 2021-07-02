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
import SnapToGrid from "./SnapToGrid";

export const controlPanelTestId = "control-panel";

type ControlPanelProps =
{
  setThemePreference?: (theme: string) => void,
  themePreference?: string,
};

export const ControlPanel = ({
  setThemePreference,
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
      <SnapToGrid />
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
  themePreference,
}: {
  themePreference: string,
}) =>
({
  themePreference,
});

const dispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) =>
({
  setThemePreference: (theme: string) => dispatch(setThemePreference(theme)),
});

export default connect(stateToProps, dispatchToProps)(ControlPanel);
