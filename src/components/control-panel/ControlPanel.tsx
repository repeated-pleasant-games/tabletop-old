import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";

import { addActor, removeActor } from "~/actions/tabletop";
import { Actor } from "~/core/Actor";

export const controlPanelTestId = "control-panel";

type ControlPanelProps =
{
  addActor?: () => void,
  removeActor?: (id: string) => void,
  actors?: Actor[],
};

export const ControlPanel = ({ addActor, removeActor, actors }: ControlPanelProps): any =>
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
  removeActor: (id: string) => dispatch(removeActor(id)),
});

export default connect(stateToProps, dispatchToProps)(ControlPanel);
