import * as React from "react"


import { Grid } from "./Grid"
import { Token } from "./Token"
import { ControlPanel } from "./ControlPanel"
import { Actor } from "../game/Actor"


interface VTTProperties {
    cellSize: number
}


interface VTTState {
    transform: number[]
    tokensSnapToGrid: boolean
    actors: Actor[]
}


export class VTT extends React.Component<VTTProperties, VTTState> {
    
    constructor(props: VTTProperties) {
        super(props)

        this.state = {
            transform: [ 1, 0, 0, 1, 0, 0 ],
            tokensSnapToGrid: false,
            actors: [ new Actor("Actor 1") ]
        }

        this.updateState = this.updateState.bind(this)
        this.updateTransform = this.updateTransform.bind(this)
    }

    private updateState(newState: object): void {
        this.setState(newState)
    }

    private updateTransform(newTransform: number[]): void {
        this.setState({
            transform: newTransform
        })
    }

    public render() {

        const cellDimension = this.props.cellSize

        const tokens = this.state.actors.map((actor, index) => 
            <Token
                key={index}

                actor={actor}
                
                cellDimension={cellDimension}
                vttTransform={this.state.transform}
                snapToGrid={this.state.tokensSnapToGrid}
                />
        )

        console.log(tokens)

        return <div id="vtt">
            <ControlPanel
                setSnapToGrid={(snapToGrid: boolean) =>
                    this.setState({tokensSnapToGrid: snapToGrid})}

                addActorToVTT={() => {
                    let actors = this.state.actors

                    actors.push(new Actor(`Actor ${actors.length + 1}`))

                    this.setState({ actors })
                }}
                />

            <svg>
                <Grid
                    cellDimension={cellDimension}
                    gridSubDivisions={5}

                    vttTransform={this.state.transform}
                    updateVttTransform={this.updateTransform}
                    />

                {tokens}
            </svg>
        </div>
    }

}