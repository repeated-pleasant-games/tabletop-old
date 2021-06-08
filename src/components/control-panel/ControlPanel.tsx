import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
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
  addActor: () => dispatch(addActor(new Actor(0, "", 0))),
});

export default connect(null, dispatchToProps)(ControlPanel);
