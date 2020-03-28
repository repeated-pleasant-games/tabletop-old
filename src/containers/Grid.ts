import { connect } from "react-redux"

import { setVttTransform } from "../actions/vtt"
import { AppState } from "../reducers/reducers"

import { Grid } from "../components/vtt/Grid"


const mapStateToProps = ({ vttTransform }: AppState) => (
    { vttTransform }
)

const mapDispatchToProps = (dispatch: any) => (
    {
        updateVttTransform: (scale: number, x: number, y: number) =>
            dispatch(setVttTransform(scale, x, y))
    }
)


export default connect(mapStateToProps, mapDispatchToProps)(Grid)