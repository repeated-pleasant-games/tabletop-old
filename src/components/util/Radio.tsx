import React from "react";
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
  name: ""
});

export const Radio: TRadio = ({ children, name }: RadioProps) =>
(
  <RadioContext.Provider value={{ name }}>
    {children}
  </RadioContext.Provider>
);

type OptionProps = React.HTMLAttributes<{}> &
{
  value: any,
};

Radio.Option = ({ children, value }: OptionProps) => 
{
  const labelId = uuid();

  const { name } = React.useContext(RadioContext);

  return (
    <>
      <input type="radio" aria-labelledby={labelId} name={name} value={value} />
      <label id={labelId}>{children}</label>
    </>
  );
};