import { AddActorPayload, SetViewTransformPayload } from "~/actions/tabletop";
import { Actor } from "~/core/Actor";
import { Transform } from "~/core/Transform";

export const viewTransform = (
  state: Transform = [
    [ 1, 0, 0 ], 
    [ 0, 1, 0 ], 
    [ 0, 0, 1 ], 
  ],
  action: SetViewTransformPayload
) =>
{
  switch (action.type)
  {
    case "set view transform":
      return action.viewTransform;
    
    default:
      return state;
  }
};

export const actors = (
  state: Actor[] = [],
  action: AddActorPayload
) =>
{
  switch (action.type)
  {
    case "add actor":
      return [
        ...state,
        action.actor
      ];

    default:
      return state;
  }
}