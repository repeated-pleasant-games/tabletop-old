import React from "react"

import { Actor } from "../../../core/Actor"

import TurnCard from "./TurnCard"


type TurnTrackerProps = {
    cellSize: number
    vttWidth: number
    vttHeight: number

    actors?: Actor[]
    setVttTransform?: (scale: number, x: number, y: number) => void
}


export default (
    { actors, setVttTransform, cellSize, vttWidth, vttHeight }: TurnTrackerProps
) => (
    <ul className="turn-tracker">
        {[ ...actors ]
            // Sort by descending order
            .sort((a, b) => b.initiative - a.initiative)
            .map((actor, index) => (
                <TurnCard
                    key={index}
                    actor={actor}
                    onClick={(e: React.MouseEvent) => {
                        setVttTransform(1,
                                        (vttWidth / 2) - actor.x,
                                        (vttHeight / 2) - actor.y)
                    }}
                />
            )
        )}
    </ul>
)