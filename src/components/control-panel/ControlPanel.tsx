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
  actors?: Actor[],
};

export const ControlPanel = ({ addActor, actors }: ControlPanelProps): any =>
(
  <div className="control-panel" data-testid={controlPanelTestId}>
    <section>
      <button onClick={addActor}>Add Actor</button>
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
              <li key={id}>{name}</li>
            )
          )
        }
      </ul>
    </section>
  </div>
);

const stateToProps = ({ actors }: { actors: Actor[] }) =>
({
  actors
});

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

export default connect(stateToProps, dispatchToProps)(ControlPanel);
