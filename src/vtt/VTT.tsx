import * as React from "react"

import { Grid } from "./Grid"

export class VTT extends React.Component<{}, {}> {
    public render() {
        return <div id="vtt">
            <svg>
                <Grid
                    gridDimension={128}
                    gridSubDivisions={5}
                    />
            </svg>
        </div>
    }
}