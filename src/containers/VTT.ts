import { connect } from "react-redux"

import { AppState } from "../reducers/reducers"

import { VTT } from "../components/vtt/VTT"


const mapStateToProps = ({ actors, vttTransform }: AppState) => (
    { actors, transform: vttTransform }
)


export default connect(mapStateToProps, null)(VTT)
