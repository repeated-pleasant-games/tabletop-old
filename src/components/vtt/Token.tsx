import * as React from "react"

import { Actor } from "../../core/Actor"


export type TokenProps = {
    actor: Actor
    cellDimension: number
    
    // Handled by Token container
    snapToGrid?: boolean
    dispatchMoveActor?: (id: number, x: number, y: number) => void
    vttTransform?: number[]
}


interface TokenState {
    pointerDown: boolean
    pointerOffset: { dX: number, dY: number }
}


export class Token extends React.Component<TokenProps, TokenState> {

    constructor(props: TokenProps) {
        super(props)

        this.state = {
            pointerDown: false,
            pointerOffset: { dX: 0, dY: 0 }
        }
    }

    public render() {

        const tokenRadius = this.props.cellDimension / 2

        return <circle
                    id={`token-${this.props.actor.name.replace(" ", "_")}`}

                    cx={tokenRadius + this.props.actor.x}
                    cy={tokenRadius + this.props.actor.y}
                    r={tokenRadius}

                    transform={`matrix(${this.props.vttTransform.join(" ")})`}

                    onPointerDown={(e) => {
                        (e.target as Element).setPointerCapture(e.pointerId)


                        const xTranslation = this.props.vttTransform[4]
                        const yTranslation = this.props.vttTransform[5]

                        const xScale = this.props.vttTransform[0]
                        const yScale = this.props.vttTransform[3]

                        // Compute this elements client coordinates
                        const thisClientX = (this.props.actor.x + xTranslation) * xScale
                        const thisClientY = (this.props.actor.y + yTranslation) * yScale


                        this.setState({
                            pointerDown: (e.button === 0),
                            pointerOffset: {
                                dX: thisClientX - e.clientX,
                                dY: thisClientY - e.clientY
                            }
                        })
                    }}

                    onPointerUp={(e) => {
                        (e.target as Element).releasePointerCapture(e.pointerId)

                        this.setState({ pointerDown: false })
                    }}

                    onPointerMoveCapture={(event) => {
                        if (this.state.pointerDown) {

                            const xTranslation = this.props.vttTransform[4]
                            const yTranslation = this.props.vttTransform[5]

                            const xScale = this.props.vttTransform[0]
                            const yScale = this.props.vttTransform[3]

                            const xOffset = this.state.pointerOffset.dX
                            const yOffset = this.state.pointerOffset.dY


                            // Map client coordinates to world coordinates
                            let x = ((event.clientX + xOffset) / xScale) - xTranslation
                            let y = ((event.clientY + yOffset) / yScale) - yTranslation


                            if (this.props.snapToGrid) {

                                const cellDimension = this.props.cellDimension

                                // Map world coordinates to grid coordinates
                                const gridX = Math.floor(x / cellDimension) * cellDimension
                                const gridY = Math.floor(y / cellDimension) * cellDimension


                                // MAGIC: This is a decent snapping threshold, for no explicable
                                // reason other than it feels good
                                const snapThreshold = 8

                                // Detect if our mouse is close enough to a grid line to snap.
                                if (Math.abs(x - gridX) < snapThreshold)
                                    x = gridX

                                if (Math.abs(y - gridY) < snapThreshold)
                                    y = gridY

                            }

                            this.props.dispatchMoveActor(this.props.actor.id, x, y)
                        }
                    }}
                />
    }

}