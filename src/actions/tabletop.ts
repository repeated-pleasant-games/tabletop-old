import { identityTransform, Transform, transformTranslation } from "~/core/Transform";

export type SetViewTransformPayload = {
  type: "set view transform",
  viewTransform: Transform
};
export const setViewTransform = (x: number, y: number): SetViewTransformPayload =>
({
  type: "set view transform",
  viewTransform: transformTranslation.set(identityTransform(), [ x, y ]),
});