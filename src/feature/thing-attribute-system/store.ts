import React from "react";
import { SetState } from "zustand";

import { Attribute, System } from "./type";

export type ThingAttributeSystemState =
{
  thingAttributeMap: { [s: string]: Attribute<string>[] },
  setThingAttributeMap: React.Dispatch<
    React.SetStateAction<{ [s: string]: Attribute<string>[] }>
  >,

  systems: System<any>[],
  setSystems: React.Dispatch<
    React.SetStateAction<System<any>[]>
  >,
};

export const createThingAttributeSystemState =
  (set: SetState<ThingAttributeSystemState>): ThingAttributeSystemState =>
  ({
    thingAttributeMap: {},
    setThingAttributeMap: (newMap) =>
      set(
        (state) =>
        ({
          thingAttributeMap:
            typeof newMap === "function"
            ? newMap(state.thingAttributeMap)
            : newMap
        })
      ),

    systems: [],
    setSystems: (newSystems) =>
      set(
        (state) =>
        ({
          systems:
            typeof newSystems === "function"
            ? newSystems(state.systems)
            : newSystems
        })
      ),
  });