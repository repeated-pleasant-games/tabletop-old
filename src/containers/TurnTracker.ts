import { connect } from "react-redux"

import { setVttTransform } from "../actions/vtt"
import { setActorInitiative } from "../actions/actor"
import { VttState } from "../reducers/vtt"

import TurnTracker from "../components/vtt/turn_tracker/TurnTracker"


const mapStateToProps = ({ actors, turnOrder }: VttState) => (
    { actors, turnOrder }
)

const mapDispatchToProps = (dispatch: any) => (
    {
        setVttTransform: (scale: number, x: number, y: number) =>
            dispatch(setVttTransform(scale, x, y)),

        setInitiative: (id: number, initiative: number) =>
            dispatch(setActorInitiative(id, initiative))
    }
)


export default connect(mapStateToProps, mapDispatchToProps)(TurnTracker)