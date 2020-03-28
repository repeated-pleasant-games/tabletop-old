import { connect } from "react-redux"

import { VttState } from "../reducers/vtt"

import VTT from "../components/vtt/VTT"


const mapStateToProps = ({ actors, vttTransform }: VttState) => (
    { actors, transform: vttTransform }
)


export default connect(mapStateToProps, null)(VTT)
