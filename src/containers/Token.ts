import { connect } from "react-redux"

import { moveActor } from "../actions/actor"
import { AppState } from "../reducers/reducers"

import { Token } from "../components/vtt/Token"


const mapStateToProps = ({ gridSnap, vttTransform }: AppState) => (
    { snapToGrid: gridSnap, vttTransform }
)


const mapDispatchToProps = (dispatch: any) => (
    {
        dispatchMoveActor: (id: number, x: number, y: number) =>
            dispatch(moveActor(id, x, y))
    }
)


export default connect(mapStateToProps, mapDispatchToProps)(Token)