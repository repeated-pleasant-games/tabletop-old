import { SetViewTransformPayload } from "~/actions/tabletop";
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