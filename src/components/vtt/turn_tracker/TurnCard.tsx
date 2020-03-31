import React from "react"

import { Actor } from "../../../core/Actor"


type TurnCardProps = {
    actor: Actor
}


export default ({ actor }: TurnCardProps) => (
    <li>
        {actor.name}
    </li>
)