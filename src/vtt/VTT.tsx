import * as React from "react"


import { Grid } from "./Grid"


interface VTTProperties {
    cellSize: number
}


interface VTTState {
    transform: number[]
}


export class VTT extends React.Component<VTTProperties, VTTState> {
    
    constructor(props: VTTProperties) {
        super(props)

        this.state = {
            transform: [ 1, 0, 0, 1, 0, 0 ]
        }

        this.updateTransform = this.updateTransform.bind(this)
    }

    private updateTransform(newTransform: number[]) {
        this.setState({
            transform: newTransform
        })
    }

    public render() {

        const cellDimension = this.props.cellSize

        return <div id="vtt">
            <svg>

                <Grid
                    cellDimension={cellDimension}
                    gridSubDivisions={5}

                    vttTransform={this.state.transform}
                    updateVttTransform={this.updateTransform}
                    />

                <rect
                    width={cellDimension}
                    height={cellDimension}
                    transform={`matrix(${this.state.transform.join(" ")})`}/>

            </svg>
        </div>
    }

}