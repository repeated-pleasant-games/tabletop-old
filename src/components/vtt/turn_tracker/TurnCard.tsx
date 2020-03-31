import React from "react"

import { Actor } from "../../../core/Actor"


type TurnCardProps = {
    actor: Actor,
    setVttTransform: (scale: number, x: number, y: number) => void
}


export default ({ actor, setVttTransform }: TurnCardProps) => (
    <li
        onClick={(e: React.MouseEvent) => {
            // HACK: This keeps us from using a VTT size that's different
            // from the client window dimensions.
            const windowWidth = window.innerWidth
            const windowHeight = window.innerHeight

            setVttTransform(1,
                            (windowWidth / 2) - actor.x,
                            (windowHeight / 2) - actor.y)
        }}>
        {actor.name}
        <span>{actor.initiative}</span>
    </li>
)