
type SetViewTransformPayload = {
  type: "set view transform",
  viewTransform: number[]
};
export const setViewTransform = (x: number, y: number): SetViewTransformPayload =>
({
  type: "set view transform",
  viewTransform: [ 1, 0, 0, 1, x, y ],
});