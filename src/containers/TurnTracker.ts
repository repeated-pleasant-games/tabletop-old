import { connect } from "react-redux"

import { VttState } from "../reducers/vtt"

import TurnTracker from "../components/vtt/turn_tracker/TurnTracker"


const mapStateToProps = ({ actors }: VttState) => (
    { actors }
)


export default connect(mapStateToProps, null)(TurnTracker)