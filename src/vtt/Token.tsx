import * as React from "react"


interface TokenProps {
    x: number
    y: number
    cellDimension: number
    vttTransform: number[]
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
            this.setState({
                x: this.state.x + event.movementX,
                y: this.state.y + event.movementY
            })
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