import React, { InputHTMLAttributes } from "react";
import { v4 as uuid } from "uuid";

import "./Radio.module.css";

type TRadio = React.FunctionComponent<RadioProps> &
{
  Option?: React.FunctionComponent<OptionProps>
};

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type RadioProps = Omit<React.HTMLAttributes<{}>, "onChange"> &
{
  name: string,
  onChange?: (value: any) => void,
};

const RadioContext = React.createContext({
  name: "",
  onChange: (value: any) => null,
  currentValue: null,
});

export const Radio: TRadio = ({
  children,
  name,
  onChange: _onChange = (value: any) => null,
}: RadioProps) =>
{
  const [ currentValue, setCurrentValue ] = React.useState(null);

  const onChange = (value: any) =>
  {
    setCurrentValue(value);
    _onChange(value);
  };

  return (
    <RadioContext.Provider value={{ name, onChange, currentValue }}>
      {children}
    </RadioContext.Provider>
  );
}

type OptionProps = React.InputHTMLAttributes<{}> &
{
  value: any,
};

Radio.Option = ({ children, value, checked }: OptionProps) => 
{
  const labelId = uuid();

  const { name, onChange, currentValue } = React.useContext(RadioContext);

  React.useEffect(
    () =>
    {
      if (checked) onChange(value);
    },
    []
  );

  return (
    <>
      <input
        type="radio"
        name={name}

        aria-labelledby={labelId}

        value={value}
        onChange={() => onChange(value)}

        checked={currentValue === value}
      />
      <label id={labelId}>{children}</label>
    </>
  );
};