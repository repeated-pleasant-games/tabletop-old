import React from "react"


export type ButtonProps = {
    label: string
    onClick?: (e: React.MouseEvent) => void
}

const Button = ({ label, onClick }: ButtonProps) => (
    <div className="form-field">
        <button onClick={onClick}>
            {label}
        </button>
    </div>
)

export default Button