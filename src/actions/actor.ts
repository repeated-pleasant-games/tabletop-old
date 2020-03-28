
/* --- Action Types --- */

export enum ActorAction {
    "MOVE_ACTOR" = "MOVE_ACTOR"
}


/* --- Additional Constants --- */


/* --- Payload Types --- */

type ActionPayload<T> = { type: ActorAction } & T

export type PayloadMoveActor = ActionPayload<{
    id: number,
    x: number,
    y: number
}>


/* --- Action Creators --- */

export const moveActor = (id: number, x: number, y: number) =>
    <PayloadMoveActor>{ type: "MOVE_ACTOR", id, x, y }