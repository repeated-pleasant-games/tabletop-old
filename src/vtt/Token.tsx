import * as React from "react"


interface TokenProps {
    x: number
    y: number
    cellDimension: number
    vttTransform: number[]
    snapToGrid: boolean
}


interface TokenState {
    x: number
    y: number
    pointerDown: boolean
}


export class Token extends React.Component<TokenProps, TokenState> {

    constructor(props: TokenProps) {
        super(props)

        this.state = {
            x: props.x,
            y: props.y,
            pointerDown: false
        }

        this.handlePointerMove = this.handlePointerMove.bind(this)
    }

    private handlePointerMove(event: React.PointerEvent) {

        if (this.state.pointerDown) {

            let x = this.state.x + event.movementX
            let y = this.state.y + event.movementY

            if (this.props.snapToGrid) {

                const xTranslation = this.props.vttTransform[4]
                const yTranslation = this.props.vttTransform[5]

                const inverseXScale = 1 / this.props.vttTransform[0]
                const inverseYScale = 1 / this.props.vttTransform[3]

                // Map client coordinates to world coordinates
                x = (event.clientX - xTranslation) * inverseXScale
                y = (event.clientY - yTranslation) * inverseYScale

                // Map world coordinates to grid coordinates
                x = Math.floor(x / this.props.cellDimension) * this.props.cellDimension
                y = Math.floor(y / this.props.cellDimension) * this.props.cellDimension

                /*
                // Detect if our mouse is close enough to a grid line to snap.

                const snapThreshold = 20

                if (x - gridX < snapThreshold)
                    x = gridX

                if (y - gridY < snapThreshold)
                    y = gridY
                */

            }

            this.setState({ x, y })

        }

    }

    public render() {

        const cellDimension = this.props.cellDimension

        return <rect
                    x={this.state.x} y={this.state.y}
                    width={cellDimension}
                    height={cellDimension}
                    transform={`matrix(${this.props.vttTransform.join(" ")})`}
                    
                    onPointerDown={(e) => {
                        (e.target as Element).setPointerCapture(e.pointerId)

                        this.setState({ pointerDown: (e.button === 0) })
                    }}

                    onPointerUp={(e) => {
                        (e.target as Element).releasePointerCapture(e.pointerId)

                        this.setState({ pointerDown: false })
                    }}

                    onPointerMoveCapture={this.handlePointerMove}
                    />
    }

}