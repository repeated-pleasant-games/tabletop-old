import * as React from "react"


import { Grid } from "./Grid"
import { Token } from "./Token"
import { VTTControlPanel } from "./VTTControlPanel"


interface VTTProperties {
    cellSize: number
}


interface VTTState {
    transform: number[]
    tokensSnapToGrid: boolean
}


export class VTT extends React.Component<VTTProperties, VTTState> {
    
    constructor(props: VTTProperties) {
        super(props)

        this.state = {
            transform: [ 1, 0, 0, 1, 0, 0 ],
            tokensSnapToGrid: false
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

        return <div id="vtt">
            <VTTControlPanel
                updateVTTState={this.updateState}/>

            <svg>
                <Grid
                    cellDimension={cellDimension}
                    gridSubDivisions={5}

                    vttTransform={this.state.transform}
                    updateVttTransform={this.updateTransform}
                    />

                <Token
                    x={0} y={0}
                    cellDimension={cellDimension}
                    vttTransform={this.state.transform}
                    snapToGrid={this.state.tokensSnapToGrid}
                    />
            </svg>
        </div>
    }

}