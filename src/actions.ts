
/* --- Action Types --- */

export enum Action {
    "SET_GRID_SNAP" = "SET_GRID_SNAP",
    "ADD_ACTOR" = "ADD_ACTOR"
}

/* --- Additional Constants --- */

/* --- Action Creators --- */

type ActionPayload<T> = { type: Action } & T

export type PayloadSetGridSnap = ActionPayload<{ gridSnap: boolean }>
export type PayloadAddActor = ActionPayload<{}>


export const addActor = () =>
    <PayloadAddActor>{ type: "ADD_ACTOR" }

export const setGridSnap = (gridSnap: boolean) =>
    <PayloadSetGridSnap>{ type: "SET_GRID_SNAP", gridSnap }