import { connect } from "react-redux"

import { setVttTransform } from "~/actions/vtt"
import { VttState } from "~/reducers/vtt"

import { Grid } from "~/components/vtt/Grid"


const mapStateToProps = ({ vttTransform }: VttState) => (
    { vttTransform }
)

const mapDispatchToProps = (dispatch: any) => (
    {
        updateVttTransform: (scale: number, x: number, y: number) =>
            dispatch(setVttTransform(scale, x, y))
    }
)


export default connect(mapStateToProps, mapDispatchToProps)(Grid)