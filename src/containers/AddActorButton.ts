import { connect } from "react-redux"

import { addActor } from "../actions/vtt"
import { VttState } from "../reducers/vtt"

import { Actor } from "../core/Actor"

import Button, { ButtonProps } from "../components/util/Button"


const mapStateToProps = ({ actors }: VttState) => (
    { nextId: actors.length + 1 }
)

type StateProps = ReturnType<typeof mapStateToProps>


const mapDispatchToProps = (dispatch: any) => (
    {
        addActor: (id: number) =>
            dispatch(addActor(new Actor(id, `Actor ${id}`)))
    }
)

type DispatchProps = ReturnType<typeof mapDispatchToProps>


const mergeProps = (
    { nextId }: StateProps,
    { addActor }: DispatchProps,
    ownProps: ButtonProps
) => (
    {
        onClick: (e: React.MouseEvent) => addActor(nextId),
        ...ownProps
    }
)


export default connect<StateProps, DispatchProps, ButtonProps>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(Button)