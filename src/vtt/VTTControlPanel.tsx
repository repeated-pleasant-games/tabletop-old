import * as React from "react"


interface VTTControlPanelProps {
    updateVTTState: (state: object) => void
}


export class VTTControlPanel extends React.Component<VTTControlPanelProps, {}> {
    public render() {
        return <div className="vtt-control-panel">
            <input
                type="checkbox"
                name="snap-to-grid"
                id="snap-to-grid-toggle"

                onChange={(e) => {
                    this.props.updateVTTState({ tokensSnapToGrid: e.target.checked })
                }}
                />

            <label htmlFor="snapt-to-grid">Toggle Snap to Grid</label>
        </div>
    }
}