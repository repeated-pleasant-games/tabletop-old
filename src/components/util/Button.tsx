import React from "react"


type ButtonProps = {
    label: string
    onClick?: (e: React.MouseEvent) => void
}


export default ({ label, onClick }: ButtonProps) => (
    <div className="form-field">
        <button onClick={onClick}>
            {label}
        </button>
    </div>
)