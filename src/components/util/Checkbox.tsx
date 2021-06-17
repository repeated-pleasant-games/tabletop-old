import React from "react";
import { v4 as uuid } from "uuid";

type CheckboxProps = React.HTMLAttributes<{}> &
{
  checked?: boolean,
  onChecked?: () => void,
  onUnchecked?: () => void,
};

export const Checkbox = ({
  checked: _checked = false,
  onChecked = () => null,
  onUnchecked = () => null,
  children
}: CheckboxProps) =>
{
  const labelId = uuid();

  const [ checked, isChecked ] = React.useState(_checked);

  return (
    <>
      <input
        type="checkbox"
        aria-labelledby={labelId}

        checked={checked}

        onChange={
          ({ target }) =>
          {
            const value = (target as HTMLInputElement).checked;

            if (value === true)
              onChecked()
            else
              onUnchecked()

            isChecked(value);
          }
        }
      />
      <label id={labelId}>{children}</label>
    </>
  );
}