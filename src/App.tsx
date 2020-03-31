import * as React from "react"

import VTT from "./containers/VTT"

export class App extends React.Component<{}, {}> {
    public render () {
        return (
            <VTT
                cellSize={24}
                width={window.innerWidth}
                height={window.innerHeight}
            />
        )
    }
}