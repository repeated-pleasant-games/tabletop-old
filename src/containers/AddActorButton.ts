import { connect } from "react-redux"

import { addActor } from "../actions/vtt"

import Button from "../components/util/Button"


const mapDispatchToProps = (dispatch: any) => (
    {
        onClick: (e: React.MouseEvent) =>
            dispatch(addActor())
    }
)


export default connect(null, mapDispatchToProps)(Button)