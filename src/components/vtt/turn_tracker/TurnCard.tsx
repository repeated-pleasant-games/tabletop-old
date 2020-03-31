import React from "react"

import { Actor } from "../../../core/Actor"


type TurnCardProps = {
    actor: Actor
    onClick: (e: React.MouseEvent) => void
}


export default ({ actor, onClick }: TurnCardProps) => (
    <li
        onClick={(e: React.MouseEvent) => onClick(e)}>
        {actor.name}
        <span>{actor.initiative}</span>
    </li>
)