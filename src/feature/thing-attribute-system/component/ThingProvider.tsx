import React from "react";

export const ThingContext = React.createContext<string>("");

export const ThingProvider = (
  {
    children,
    thingId,
  }: {
    children: React.ReactNode,
    thingId: string,
  }
) =>
(
  <ThingContext.Provider value={thingId}>
    {children}
  </ThingContext.Provider>
);