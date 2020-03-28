import { combineReducers } from "redux"

import {
    PayloadSetGridSnap,
    PayloadAddActor,
    PayloadSetVttTransform
} from "../actions/vtt"

import {
    PayloadMoveActor,
} from "../actions/actor"

import { Actor } from "../core/Actor"


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
    action: PayloadAddActor | PayloadMoveActor
) => {
    switch (action.type) {
        case "ADD_ACTOR":
            return [
                ...state,
                new Actor(`Actor ${state.length + 1}`)
            ]

        case "MOVE_ACTOR": {
            const { id, x, y } = action

            return state.map((actor: Actor, i: number) => (
                i === id
                ? new Actor(actor.name, x, y)
                : actor
            ))
        }

        default:
            return state
    }
}


const vttReducer = combineReducers({
    actors,
    vttTransform,
    gridSnap
})


export default vttReducer
export type VttState = ReturnType<typeof vttReducer>