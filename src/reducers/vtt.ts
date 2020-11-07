import { combineReducers } from "redux"

import {
    PayloadSetGridSnap,
    PayloadAddActor,
    PayloadSetVttTransform
} from "~/actions/vtt"

import {
    PayloadMoveActor,
    PayloadSetActorInitiative
} from "~/actions/actor"

import { Actor } from "~/core/Actor"
import TurnEntry from "~/core/TurnEntry"


export const gridSnap = (
    state: boolean = false,
    action: PayloadSetGridSnap
) => {
    switch (action.type) {
        case "SET_GRID_SNAP":
            return action.gridSnap

        default:
            return state
    }
}


export const vttTransform = (
    state: number[] = [ 1, 0, 0, 1, 0, 0 ],
    action: PayloadSetVttTransform
) => {
    switch (action.type) {
        case "SET_VTT_TRANSFORM": {
            const { scale, x, y } = action

            return [ scale, 0, 0, scale, x, y ]
        }

        default:
            return state
    }
}


export const actors = (
    state: Actor[] = [],
    action: (PayloadAddActor | PayloadMoveActor & PayloadSetActorInitiative)
) => {
    switch (action.type) {
        case "ADD_ACTOR":
            return [
                ...state,
                action.actor
            ]

        case "MOVE_ACTOR": {
            const { id, x, y } = action

            return state.map((actor: Actor) => (
                actor.id === id
                ? <Actor>{ ...actor, x, y }
                : actor
            ))
        }

        case "SET_ACTOR_INITIATIVE": {
            const { id, initiative } = action

            return state.map((actor: Actor) => (
                actor.id === id
                ? <Actor>{ ...actor, initiative }
                : actor
            ))
        }

        default:
            return state
    }
}


export const turnOrder = (
    state: TurnEntry[] = [],
    action: (PayloadAddActor)
) => {
    switch (action.type) {
        case "ADD_ACTOR":
            return [
                ...state,
                new TurnEntry(action.actor)
            ]

        default:
            return state
    }
}


const vttReducer = combineReducers({
    actors,
    vttTransform,
    gridSnap,
    turnOrder
})


export default vttReducer
export type VttState = ReturnType<typeof vttReducer>