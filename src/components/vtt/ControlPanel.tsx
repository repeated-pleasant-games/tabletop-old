import * as React from "react"
import { connect } from "react-redux"

import { setGridSnap } from "~/actions/vtt"
import { addActor } from "~/actions/vtt"
import { VttState } from "~/reducers/vtt"

import { Actor } from "~/core/Actor"

import Checkbox from "~/components/util/Checkbox"
import Button, { ButtonProps } from "~/components/util/Button"


const mapGridSnapToProps = ({ gridSnap }: VttState) => (
    { checked: gridSnap }
)

const mapGridSnapDispatchToProps = (dispatch: any) => (
    {
        onChange: (e: React.ChangeEvent) =>
            dispatch(setGridSnap((e.target as HTMLInputElement).checked))
    }
)

const GridSnapCheckbox = connect(
  mapGridSnapToProps,
  mapGridSnapDispatchToProps)(Checkbox)


const mapNextIdToProps = ({ actors }: VttState) => (
    { nextId: actors.length + 1 }
)

type NextIdProps = ReturnType<typeof mapNextIdToProps>

const mapAddActorDispatchToProps = (dispatch: any) => (
    {
        addActor: (id: number) =>
            dispatch(
              addActor(new Actor(
                id,
                `Actor ${id}`,
                Math.floor(Math.random() * 20) + 1)))
    }
)

type AddActorDispatchProps = ReturnType<typeof mapAddActorDispatchToProps>

const mergeProps = (
    { nextId }: NextIdProps,
    { addActor }: AddActorDispatchProps,
    ownProps: ButtonProps
) => (
    {
        onClick: (e: React.MouseEvent) => addActor(nextId),
        ...ownProps
    }
)

const AddActorButton = connect(
    mapNextIdToProps,
    mapAddActorDispatchToProps,
    mergeProps)(Button)


export default () => (
    <div className="control-panel">
        <GridSnapCheckbox
            name="snap-to-grid"
            label="Toggle Snap to Grid"
        />

        <AddActorButton
            label="Add Actor"
        />
    </div>
)