import * as React from "react"

import VTT from "~/components/vtt/VTT"

export class App extends React.Component<{}, {}> {
    public render () {
        return (
            <VTT cellSize={24} />
        )
    }
}