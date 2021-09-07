import React from "react";
import { Attribute, System } from "../type";

export const ThingAttributeSystemContext = React.createContext<{
  thingAttributeMap: { [s: string]: Attribute<string>[] },
  setThingAttributeMap: React.Dispatch<
    React.SetStateAction<{ [s: string]: Attribute<string>[] }>
  >
  systems: System<any>[]
  setSystems: React.Dispatch<
    React.SetStateAction<System<any>[]>
  >
}>({
  thingAttributeMap: {},
  setThingAttributeMap: () => void null,
  systems: [],
  setSystems: () => void null,
});

export const ThingAttributeSystemProvider = ({ children, value }: {
  children: React.ReactNode
  value: {
    thingAttributeMap: { [s: string]: Attribute<string>[] },
    setThingAttributeMap: React.Dispatch<{ [s: string]: Attribute<string>[] }>
    systems: System<any>[]
    setSystems: React.Dispatch<System<any>[]>
  }
}) =>
(
  <ThingAttributeSystemContext.Provider value={value}>
    {children}
  </ThingAttributeSystemContext.Provider>
);