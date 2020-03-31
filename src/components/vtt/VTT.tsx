import * as React from "react"


import Grid from "../../containers/Grid"
import Token from "../../containers/Token"
import ControlPanel from "./ControlPanel"
import TurnTracker from "../../containers/TurnTracker"
import { Actor } from "../../core/Actor"


type VTTProps = {
    cellSize: number

    width: number
    height: number

    // Handled by container component
    actors?: Actor[]
}


export default ({ cellSize, actors, width, height }: VTTProps) => (
    <div id="vtt">
        <div className="control-container">
            <ControlPanel />
            <TurnTracker
                cellSize={cellSize}
                vttWidth={width}
                vttHeight={height}
            />

            <div style={{ background: "white", padding: "8px" }}>
                {width} &times; {height}
            </div>
        </div>

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