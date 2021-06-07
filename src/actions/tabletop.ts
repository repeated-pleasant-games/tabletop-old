import { Actor } from "~/core/Actor";
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

export type AddActorPayload = {
  type: "add actor",
  actor: Actor
};
export const addActor = (actor: Actor): AddActorPayload =>
({
  type: "add actor",
  actor
});