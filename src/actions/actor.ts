
/* --- Action Types --- */

export enum ActorAction {
    "MOVE_ACTOR" = "MOVE_ACTOR",
    "SET_ACTOR_INITIATIVE" = "SET_ACTOR_INITIATIVE"
}


/* --- Additional Constants --- */


/* --- Payload Types --- */

type ActionPayload<T> = { type: ActorAction } & T

export type PayloadMoveActor = ActionPayload<{
    id: string
    x: number
    y: number
}>

export type PayloadSetActorInitiative = ActionPayload<{
    id: string
    initiative: number
}>


/* --- Action Creators --- */

export const moveActor = (id: string, x: number, y: number) =>
    <PayloadMoveActor>{ type: "MOVE_ACTOR", id, x, y }

export const setActorInitiative = (id: string, initiative: number) =>
    <PayloadSetActorInitiative>{
        type: "SET_ACTOR_INITIATIVE",
        id,
        initiative
    }