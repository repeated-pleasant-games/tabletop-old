import { AddActorPayload, RemoveActorPayload, SetSnapToGridPayload, SetViewTransformPayload } from "~/actions/tabletop";
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
  action: AddActorPayload | RemoveActorPayload
) =>
{
  switch (action.type)
  {
    case "add actor":
      return [
        ...state,
        action.actor
      ];

    case "remove actor":
      return state.filter(({ id }) => id !== action.id);

    default:
      return state;
  }
};

export const snapToGrid = (
	state: boolean = false,
	action: SetSnapToGridPayload
) =>
{
	switch (action.type)
	{
		case "set snap to grid":
			return action.snapToGrid;

		default:
			return state;
	}
}