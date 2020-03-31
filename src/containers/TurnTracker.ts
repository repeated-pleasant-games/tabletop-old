import { connect } from "react-redux"

import { setVttTransform } from "../actions/vtt"
import { VttState } from "../reducers/vtt"

import TurnTracker from "../components/vtt/turn_tracker/TurnTracker"


const mapStateToProps = ({ actors }: VttState) => (
    { actors }
)

const mapDispatchToProps = (dispatch: any) => (
    {
        setVttTransform: (scale: number, x: number, y: number) =>
            dispatch(setVttTransform(scale, x, y))
    }
)


export default connect(mapStateToProps, mapDispatchToProps)(TurnTracker)