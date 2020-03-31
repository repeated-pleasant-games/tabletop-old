import * as React from "react"


import Grid from "../../containers/Grid"
import Token from "../../containers/Token"
import ControlPanel from "./ControlPanel"
import TurnTracker from "../../containers/TurnTracker"
import { Actor } from "../../core/Actor"


type VTTProps = {
    cellSize: number

    // Handled by container component
    actors?: Actor[]
}


export default ({ cellSize, actors }: VTTProps) => (
    <div id="vtt">
        <ControlPanel />

        <TurnTracker />

        <svg>
            <Grid
                cellDimension={cellSize}
                gridSubDivisions={5}
            />
            
            {actors.map((actor, index) => 
                <Token
                    key={index}

                    actorId={index}
                    actor={actor}
                    
                    cellDimension={cellSize}
                    />
            )}
        </svg>
    </div>
)