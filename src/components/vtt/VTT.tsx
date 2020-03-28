import * as React from "react"


import Grid from "../../containers/Grid"
import Token from "../../containers/Token"
import { ControlPanel } from "./ControlPanel"
import { Actor } from "../../core/Actor"


interface VTTProperties {
    cellSize: number
    actors?: Actor[]
    transform: number[]
}


export class VTT extends React.Component<VTTProperties, {}> {
    
    constructor(props: VTTProperties) {
        super(props)

        this.updateState = this.updateState.bind(this)
    }

    private updateState(newState: object): void {
        this.setState(newState)
    }

    public render() {

        const cellDimension = this.props.cellSize

        return <div id="vtt">
            <ControlPanel />

            <svg>
                <Grid
                    cellDimension={cellDimension}
                    gridSubDivisions={5}
                    />

                {this.props.actors.map((actor, index) => 
                    <Token
                        key={index}

                        actorId={index}
                        actor={actor}
                        
                        cellDimension={cellDimension}
                        vttTransform={this.props.transform}
                        />
                )}
            </svg>
        </div>
    }

}