import React from "react"

import TurnEntry from "~/core/TurnEntry"
import { Actor } from "~/core/Actor"

import TurnCard from "./TurnCard"


type TurnTrackerProps = {
    cellSize: number
    vttWidth: number
    vttHeight: number

    actors?: Actor[]
    turnOrder?: TurnEntry[]
    setVttTransform?: (scale: number, x: number, y: number) => void
    setInitiative?: (id: number, initiative: number) => void
}


export default (
    {
        actors,
        turnOrder,
        setVttTransform,
        cellSize,
        vttWidth,
        vttHeight
    }: TurnTrackerProps
) => {

    const actorsInTurnOrder = turnOrder
                              .map(
                                ({ actorId }) =>
                                    actors.find(({ id }) => id === actorId))

    return (
        <ul className="turn-tracker">
               {actorsInTurnOrder
                // Sort by descending order
                .sort((a, b) => b.initiative - a.initiative)
                .map((actor) => (
                    <TurnCard
                        key={actor.id}
                        actor={actor}
                        onClick={(e: React.MouseEvent) => {
                            setVttTransform(1,
                                            (vttWidth / 2) - actor.x - (cellSize/2),
                                            (vttHeight / 2) - actor.y - (cellSize/2))
                        }}
                    />
                )
            )}
        </ul>
    )
}