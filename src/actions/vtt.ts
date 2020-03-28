
/* --- Action Types --- */

export enum VTTAction {
    "SET_GRID_SNAP" = "SET_GRID_SNAP",
    "ADD_ACTOR" = "ADD_ACTOR",
    "SET_VTT_TRANSFORM" = "SET_VTT_TRANSFORM"
}


/* --- Additional Constants --- */


/* --- Payload Types --- */

type ActionPayload<T> = { type: VTTAction } & T

export type PayloadSetGridSnap = ActionPayload<{ gridSnap: boolean }>
export type PayloadSetVttTransform = ActionPayload<{
    scale: number
    x: number
    y: number
}>
export type PayloadAddActor = ActionPayload<{}>


/* --- Action Creators --- */

export const addActor = () =>
    <PayloadAddActor>{ type: "ADD_ACTOR" }

export const setVttTransform = (scale: number, x: number, y: number) =>
    <PayloadSetVttTransform>{
        type: "SET_VTT_TRANSFORM",
        scale,
        x, y
    }

export const setGridSnap = (gridSnap: boolean) =>
    <PayloadSetGridSnap>{ type: "SET_GRID_SNAP", gridSnap }