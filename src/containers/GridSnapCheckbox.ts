import React from "react"
import { connect } from "react-redux"

import { setGridSnap } from "../actions/vtt"
import { AppState } from "../reducers/reducers"

import Checkbox from "../components/util/Checkbox"


const mapStateToProps = ({ gridSnap }: AppState) => (
    { checked: gridSnap }
)

const mapDispatchToProps = (dispatch: any) => (
    {
        onChange: (e: React.ChangeEvent) =>
            dispatch(setGridSnap((e.target as HTMLInputElement).checked))
    }
)


export default connect(mapStateToProps, mapDispatchToProps)(Checkbox)