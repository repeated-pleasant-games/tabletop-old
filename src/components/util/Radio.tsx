import React from "react";
import { v4 as uuid } from "uuid";

type TRadio = React.FunctionComponent<RadioProps> &
{
  Option?: React.FunctionComponent
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

Radio.Option = ({ children }: React.HTMLAttributes<{}>) => 
{
  const labelId = uuid();

  const { name } = React.useContext(RadioContext);

  return (
    <>
      <input type="radio" aria-labelledby={labelId} name={name} />
      <label id={labelId}>{children}</label>
    </>
  );
};