import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { removeActor } from "~/actions/tabletop";
import { Actor } from "~/core/Actor";

export const actorListTestId = "actor-list";
export const actorListItemTestId = "actor-list-item";

export const ActorList = ({
  removeActor = (_) => null,
  actors,
}: {
  removeActor?: (id: string) => void
  actors?: Actor[]
}) =>
(
  <ul data-testid={actorListTestId}>
    {
      actors &&
      actors
      .sort(
        (a, b) => Math.sign(b.initiative - a.initiative)
      )
      .map(
        (actor) =>
        <li
          key={actor.id}
          data-testid={actorListItemTestId}
          onClick={() => removeActor(actor.id)}
        >
          {actor.name}
        </li>
      )
    }
  </ul>
);

const stateToProps = ({ actors }: { actors: Actor[] }) =>
({
  actors,
});

const dispatchToProps = (dispatch: Dispatch) =>
({
  removeActor: (id: string) => dispatch(removeActor(id)),
});

export default connect(stateToProps, dispatchToProps)(ActorList);