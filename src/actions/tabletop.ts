import { Transform } from "~/core/Transform";

export type SetViewTransformPayload = {
  type: "set view transform",
  viewTransform: Transform
};
export const setViewTransform = (
  viewTransform: Transform
): SetViewTransformPayload =>
({
  type: "set view transform",
  viewTransform,
});