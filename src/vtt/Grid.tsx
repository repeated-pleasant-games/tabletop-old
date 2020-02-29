import * as React from "react"

interface GridProperties {
    gridDimension: number
    gridSubDivisions: number
}

export class Grid extends React.Component<GridProperties, {}> {
    public render() {

        const gridDimension = this.props.gridDimension
        const subgridDimension = gridDimension / this.props.gridSubDivisions

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
                        stroke-width="0.5"
                        />
                </pattern>

                <pattern
                    id="pattern-grid"
                    width={gridDimension}
                    height={gridDimension}
                    patternUnits="userSpaceOnUse"
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
                        stroke-width="1"
                        />
                </pattern>
            </defs>

            <rect
                width="100%"
                height="100%"
                fill="url(#pattern-grid)"
                />
        </g>
    }
}