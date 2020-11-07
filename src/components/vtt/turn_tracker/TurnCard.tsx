import React from "react"
import { Dispatch } from "redux"

import { connect } from "react-redux"

import { Actor } from "~/core/Actor"

import { VttState } from "~/reducers/vtt"
import { setActorInitiative as setInitiative } from "~/actions/actor"


/* --- Component --- */

export type TurnCardProps = {
    actor: Actor
    onClick: (e: React.MouseEvent) => void
}


export const TurnCard = ({ actor, onClick, setInitiative }: TurnCardProps & DispatchProps) => {

    const [ scratch, setScratch ] = React.useState(actor.initiative.toString())

    return (
        <li
            onClick={(e: React.MouseEvent) => onClick(e)}
        >
            {actor.name}

            <input
                type="text"
                value={scratch}

                onChange={(e: React.ChangeEvent) => {
                    const { value } = e.target as HTMLInputElement

                    setScratch(value)

                    const newInitiative = parseInt(value, 10)

                    if (!isNaN(newInitiative))
                        setInitiative(actor.id, newInitiative)
                }}

                onClick={(e: React.MouseEvent) => e.stopPropagation()}
            />
        </li>
    )
}


/* --- Container --- */

const mapDispatchToProps = (dispatch: Dispatch) => (
    {
        setInitiative: (id: number, newInitiative: number) =>
            dispatch(setInitiative(id, newInitiative))
    }
)

type DispatchProps = ReturnType<typeof mapDispatchToProps>


export default connect<{}, DispatchProps, TurnCardProps>(
    null,
    mapDispatchToProps
)(TurnCard)