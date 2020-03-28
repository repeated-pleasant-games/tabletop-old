import { combineReducers } from "redux"

import { gridSnap, actors, vttTransform } from "./vtt"


const rootReducer = combineReducers({
    gridSnap,
    actors,
    vttTransform
})

export default rootReducer
export type AppState = ReturnType<typeof rootReducer>