import React from "react"

import { Actor } from "../../../core/Actor"

import TurnCard from "./TurnCard"


type TurnTrackerProps = {
    actors?: Actor[]
}


export default ({ actors }: TurnTrackerProps) => (
    <ul className="turn-tracker">
        {[ ...actors ]
            // Sort by descending order
            .sort((a, b) => b.initiative - a.initiative)
            .map((actor, index) => (
                <TurnCard
                    key={index}
                    actor={actor}
                />
            )
        )}
    </ul>
)