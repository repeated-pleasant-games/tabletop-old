import React from "react"

import { Actor } from "../../../core/Actor"

import TurnCard from "./TurnCard"


type TurnTrackerProps = {
    actors?: Actor[]
}


export default ({ actors }: TurnTrackerProps) => (
    <ul className="turn-tracker">
        {actors
            .sort((f, s) => f.initiative - s.initiative)
            .map((actor, index) => (
                <TurnCard
                    key={index}
                    actor={actor}
                />
            )
        )}
    </ul>
)