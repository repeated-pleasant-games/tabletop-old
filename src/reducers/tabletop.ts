import { SetViewTransformPayload } from "~/actions/tabletop";

export const viewTransform = (
  state: number[] = [ 1, 0, 0, 1, 0, 0 ],
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