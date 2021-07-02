import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";

import { addActor } from "~/actions/tabletop";
import { Actor } from "~/core/Actor";
import { Button } from "~/components/util/Button";

export const AddActor = ({ addActor }: { addActor?: () => void}) =>
(
  <>
    <Button onClick={addActor}>Add Actor</Button>
  </>
);

const dispatchToProps = (dispatch: Dispatch) =>
({
  addActor: () =>
    dispatch(
      addActor(
        {
          id: uuid(),
          name: "",
          initiative: 0,
          x: 0,
          y: 0,
        } as Actor
      )
    ),
});

export default connect(null, dispatchToProps)(AddActor);