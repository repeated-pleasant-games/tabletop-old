import { combineReducers } from "redux"

import {
    Action,
    PayloadSetGridSnap,
    PayloadAddActor
} from "./actions"

import { Actor } from "./game/Actor"


const gridSnap = (state: boolean, action: PayloadSetGridSnap) => {
    switch (action.type) {
        case "SET_GRID_SNAP":
            return action.gridSnap

        default:
            return state
    }
}

const actors = (state: Actor[], action: PayloadAddActor) => {
    switch (action.type) {
        case "ADD_ACTOR":
            return [
                ...state,
                new Actor(`Actor ${state.length + 1}`)
            ]

        default:
            return state
    }
}

export default combineReducers({
    gridSnap,
    actors
})