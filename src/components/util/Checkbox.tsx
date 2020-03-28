import React, { FunctionComponent } from "react"


type CheckboxProps = {
    name: string
    label: string
    checked?: boolean
    onChange?: (e: React.ChangeEvent) => void
}


const Checkbox: FunctionComponent<CheckboxProps> = ({
    name, onChange, label, checked = false
}) => (
    <div className="form-field">
        <input
            type="checkbox"
            name={name}
            onChange={onChange}
            checked={checked}/>

        <label htmlFor={name}>
            {label}
        </label>
    </div>
)


export default Checkbox