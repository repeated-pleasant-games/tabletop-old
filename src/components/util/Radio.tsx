import React, { InputHTMLAttributes } from "react";
import { v4 as uuid } from "uuid";

type TRadio = React.FunctionComponent<RadioProps> &
{
  Option?: React.FunctionComponent<OptionProps>
};

type RadioProps = React.HTMLAttributes<{}> &
{
  name: string,
};

const RadioContext = React.createContext({
  name: "",
  onChange: (value: any) => null,
});

export const Radio: TRadio = ({
  children,
  name,
  onChange = (value: any) => null
}: RadioProps) =>
(
  <RadioContext.Provider value={{ name, onChange }}>
    {children}
  </RadioContext.Provider>
);

type OptionProps = React.InputHTMLAttributes<{}> &
{
  value: any,
};

Radio.Option = ({ children, value, checked }: OptionProps) => 
{
  const labelId = uuid();

  const { name, onChange } = React.useContext(RadioContext);

  React.useEffect(
    () =>
    {
      if (checked) onChange(value);
    },
    [ checked ]
  );

  return (
    <>
      <input
        type="radio"
        name={name}

        aria-labelledby={labelId}

        value={value}
        onChange={() => onChange(value)}

        checked={checked}
      />
      <label id={labelId}>{children}</label>
    </>
  );
};