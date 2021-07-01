import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";

import { addActor, removeActor, setSnapToGrid } from "~/actions/tabletop";
import { Actor } from "~/core/Actor";
import { setTheme } from "~/actions/app";
import { Button } from "../util/Button";
import { Checkbox } from "../util/Checkbox";
import { Radio } from "../util/Radio";
import { ThunkDispatch } from "redux-thunk";

export const controlPanelTestId = "control-panel";

type ControlPanelProps =
{
  addActor?: () => void,
  removeActor?: (id: string) => void,
  setSnapToGrid?: (snapToGrid: boolean) => void,
  setTheme?: (theme: string) => void,
  actors?: Actor[],
  snapToGrid?: boolean,
  theme?: string,
};

export const ControlPanel = ({
  addActor,
  removeActor,
  setSnapToGrid,
  setTheme,
  actors,
  snapToGrid,
  theme,
}: ControlPanelProps) =>
(
  <div className="control-panel" data-testid={controlPanelTestId}>
    <section>
      <Button onClick={addActor}>Add Actor</Button>
    </section>
    <section>
      <ul>
        {
          actors &&
          actors
          .sort(
            (a, b) => Math.sign(b.initiative - a.initiative)
          )
          .map(
            ({ id, name }) =>
            (
              <li
                key={id}
                onClick={() => removeActor(id)}
              >
                {name}
              </li>
            )
          )
        }
      </ul>
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
      <Radio name="set-theme" onChange={setTheme}>
        <Radio.Option value="light" checked={theme === "light"}>Light</Radio.Option>
        <Radio.Option value="system" checked={theme === "system"}>System</Radio.Option>
        <Radio.Option value="dark" checked={theme === "dark"}>Dark</Radio.Option>
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
  theme: themePreference,
});

const dispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) =>
({
  addActor: () => dispatch(addActor(
    {
      id: uuid(),
      name: "",
      initiative: 0,
      x: 0,
      y: 0,
    } as Actor
  )),
  removeActor: (id: string) => dispatch(removeActor(id)),
  setSnapToGrid: (snapToGrid: boolean) => dispatch(setSnapToGrid(snapToGrid)),
  setTheme: (theme: string) => dispatch(setTheme(theme)),
});

export default connect(stateToProps, dispatchToProps)(ControlPanel);
