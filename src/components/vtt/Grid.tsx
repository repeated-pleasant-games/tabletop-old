import * as React from "react"


interface GridProperties {
    cellDimension: number
    gridSubDivisions: number

    // Handled by container component
    vttTransform?: number[]
    updateVttTransform?: (scale: number, x: number, y: number) => void
}


interface GridState {
    pointerDown: boolean
}


export class Grid extends React.Component<GridProperties, GridState> {

    constructor(props: GridProperties) {
        super(props)

        this.state = {
            pointerDown: false
        }

        // NOTE: JavaScript is a horrible language.
        // MORE SERIOUS NOTE: Apparently this is how we get around the issue
        // of mapping a member function to an event hanlder and the even
        // handler subsequently complaining that `this` is undefined. It binds
        // the `this` keyword to the value of `bind()`'s parameter. This is
        // because `this` has arcane and cursed properties that drive mortals
        // to insanity.
        this.handlePointerMove = this.handlePointerMove.bind(this)
        this.handleWheel = this.handleWheel.bind(this)
    }

    private handlePointerMove(event: React.PointerEvent) {
        if (this.state.pointerDown) {
            const [ scale,,,,x,y ] = this.props.vttTransform

            const newX = event.movementX + x
            const newY = event.movementY + y

            this.props.updateVttTransform(scale, newX, newY)
        }
    }

    private handleWheel(event: React.WheelEvent) {
        event.preventDefault()
        event.stopPropagation()

        const [scale,,,,x,y ] = this.props.vttTransform

        const zoom = 1 - (event.deltaY / 100)

        const newScale = scale * zoom
        const newX = (x * zoom) + (event.clientX * (1 - zoom))
        const newY = (y * zoom) + (event.clientY * (1 - zoom))

        this.props.updateVttTransform(newScale, newX, newY)
    }

    public render() {

        const subgridDimension = this.props.cellDimension
        const gridDimension = subgridDimension * this.props.gridSubDivisions

        return <g id="grid">
            <defs>
                <pattern
                    id="pattern-subgrid"
                    width={subgridDimension}
                    height={subgridDimension}
                    patternUnits="userSpaceOnUse"
                    >
                    <path
                        d={`M ${subgridDimension} 0
                            L 0 0 0 ${subgridDimension}`}
                        fill="none"
                        stroke="grey"
                        strokeWidth="0.5"
                        />
                </pattern>

                <pattern
                    id="pattern-grid"
                    width={gridDimension}
                    height={gridDimension}
                    patternUnits="userSpaceOnUse"

                    patternTransform={`matrix(${this.props.vttTransform.join(" ")})`}
                    >
                    <rect
                        width={gridDimension}
                        height={gridDimension}
                        fill="url(#pattern-subgrid)"
                        />
                    <path
                        d={`M ${gridDimension} 0
                            L 0 0 0 ${gridDimension}`}
                        fill="none"
                        stroke="grey"
                        strokeWidth="1"
                        />
                </pattern>
            </defs>

            <rect
                width="100%"
                height="100%"
                fill="url(#pattern-grid)"

                onPointerDown={(e) => {
                    (e.target as Element).setPointerCapture(e.pointerId)

                    this.setState({ pointerDown: (e.button === 0) })
                }}

                onPointerUp={(e) => {
                    (e.target as Element).releasePointerCapture(e.pointerId)
                    
                    this.setState({ pointerDown: false })
                }}

                onPointerMoveCapture={this.handlePointerMove}
                onWheelCapture={this.handleWheel}
            />

            <circle
                r="3"
                cx="0"
                cy="0"
                fill="red"

                transform={`translate(${this.props.vttTransform.slice(4).join(" ")})`}
            />
        </g>
    }

}