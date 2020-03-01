import * as React from "react"


interface TokenProps {
    cellDimension: number
    vttTransform: number[]
}


export class Token extends React.Component<TokenProps, {}> {

    public render() {

        const cellDimension = this.props.cellDimension

        return <rect
                    width={cellDimension}
                    height={cellDimension}
                    transform={`matrix(${this.props.vttTransform.join(" ")})`}/>
    }

}