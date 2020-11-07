import * as React from "react"
import { connect } from "react-redux"
import ResizeObserver from "resize-observer-polyfill"

import Grid from "~/containers/Grid"
import Token from "~/components/vtt/Token"
import ControlPanel from "./ControlPanel"
import TurnTracker from "~/components/vtt/turn_tracker/TurnTracker"
import { Actor } from "~/core/Actor"
import { VttState } from "~/reducers/vtt"


type VTTProps = {
    cellSize: number

    // Handled by container component
    actors?: Actor[]
}

/**
 * Should we wrap this in a context that provides a load of things to
 * its children???
 */
export const VTT = ({ cellSize, actors }: VTTProps) => {

    const vttRef = React.useRef(null)


    const [ size, setSize ] = React.useState({ width: 0, height: 0 })

    React.useEffect(() => {
        setSize({
            width: vttRef.current.offsetWidth,
            height: vttRef.current.offsetHeight
        })
    }, [])


    const [ resizeObserver, setResizeObserver ] = React.useState(
        new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect
            setSize({ width, height })
        })
    )

    React.useEffect(() => {
        resizeObserver.observe(vttRef.current)

        return () => resizeObserver.disconnect()
    }, [])


    return (
        <div id="vtt" ref={vttRef}>
            <div className="control-container">
                <ControlPanel />
                <TurnTracker
                    cellSize={cellSize}
                    vttWidth={size.width}
                    vttHeight={size.height}
                />

                <div style={{ background: "white", padding: "8px" }}>
                    {size.width} &times; {size.height}
                </div>
            </div>

            <svg>
                <Grid
                    cellDimension={cellSize}
                    gridSubDivisions={5}
                />
                
                {actors.map((actor, index) => 
                    <Token
                        key={index}
                        actor={actor}
                        cellDimension={cellSize}
                    />
                )}
            </svg>
        </div>
    )
}

const mapStateToProps = (
    { actors, vttTransform }: VttState
) => (
    {
        actors,
        transform: vttTransform
    }
)


export default connect(mapStateToProps, null)(VTT)