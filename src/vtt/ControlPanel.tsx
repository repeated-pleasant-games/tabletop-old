import * as React from "react"


interface ControlPanelProps {
    setSnapToGrid: (snapToGrid: boolean) => void
    addActorToVTT: () => void
}


export class ControlPanel extends React.Component<ControlPanelProps, {}> {
    public render() {
        return <div className="vtt-control-panel">
            <div className="form-field">
                <input
                    type="checkbox"
                    name="snap-to-grid"
                    id="snap-to-grid-toggle"

                    onChange={(e) => this.props.setSnapToGrid(e.target.checked)}
                    />

                <label htmlFor="snap-to-grid">Toggle Snap to Grid</label>
            </div>

            <div className="form-field">
                <button onClick={this.props.addActorToVTT}>
                    Insert new token
                </button>
            </div>
        </div>
    }
}