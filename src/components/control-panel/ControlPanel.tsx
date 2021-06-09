import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";

import { addActor } from "~/actions/tabletop";
import { Actor } from "~/core/Actor";

export const controlPanelTestId = "control-panel";

type ControlPanelProps =
{
  addActor?: () => void,
};

export const ControlPanel = ({ addActor }: ControlPanelProps): any =>
(
  <div className="control-panel" data-testid={controlPanelTestId}>
    <button onClick={addActor}>Add Actor</button>
  </div>
);

const dispatchToProps = (dispatch: Dispatch) =>
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
});

export default connect(null, dispatchToProps)(ControlPanel);
