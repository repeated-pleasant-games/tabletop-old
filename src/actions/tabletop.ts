import { identityTransform, Transform, translation } from "~/core/Transform";

export type SetViewTransformPayload = {
  type: "set view transform",
  viewTransform: Transform
};
export const setViewTransform = (x: number, y: number): SetViewTransformPayload =>
({
  type: "set view transform",
  viewTransform: translation.set([ x, y ], identityTransform()),
});