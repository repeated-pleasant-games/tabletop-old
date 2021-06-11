import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";

import { addActor, removeActor, setSnapToGrid } from "~/actions/tabletop";
import { Actor } from "~/core/Actor";

export const controlPanelTestId = "control-panel";

type ControlPanelProps =
{
  addActor?: () => void,
  removeActor?: (id: string) => void,
  setSnapToGrid?: (snapToGrid: boolean) => void,
  actors?: Actor[],
};

export const ControlPanel = ({
  addActor,
  removeActor,
  setSnapToGrid,
  actors
}: ControlPanelProps) =>
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
    <section>
      <input
        onChange={
          ({ target }) =>
            setSnapToGrid(
              target.value === "on"
              ? true
              : false
            )
        }
        type="checkbox"
        aria-labelledby="snap-to-grid-label"
      />
      <label id="snap-to-grid-label">Snap to Grid</label>
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
  setSnapToGrid: (snapToGrid: boolean) => dispatch(setSnapToGrid(snapToGrid)),
});

export default connect(stateToProps, dispatchToProps)(ControlPanel);
