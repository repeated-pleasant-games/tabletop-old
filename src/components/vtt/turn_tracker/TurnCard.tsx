import React from "react"

import { Actor } from "../../../core/Actor"


type TurnCardProps = {
    actor: Actor
}


export default ({ actor }: TurnCardProps) => (
    <li draggable="true">
        {actor.name}
        <span>{actor.initiative}</span>
    </li>
)