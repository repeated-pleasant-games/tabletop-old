import React, { useLayoutEffect } from "react";

import { v4 as uuidv4 } from "uuid";

import { Attribute, System } from "../type";

export const useThingAttributeSystem = () =>
{
  const [ thingAttributeMap, setThingAttributeMap ] =
    React.useState<{ [s: string]: Attribute<string>[] }>({});
  const [ systems, setSystems ] =
    React.useState<System<any>[]>([]);

  return {
    createThing: () =>
      uuidv4(),

    addAttributeToThing: <A extends Attribute<string>>(
      thingId: string,
      attribute: Omit<A, "id">
    ) => 
    {
      const id = uuidv4();

      if (thingAttributeMap[thingId])
      {
        const attributes = thingAttributeMap[thingId];

        setThingAttributeMap(
          (prevMap) =>
          ({
            ...prevMap,
            [thingId]: [
              ...attributes,
              {
                id,
                ...attribute
              }
            ]
          })
        );
      }
      else
      {
        setThingAttributeMap(
          (prevMap) =>
          ({
            ...prevMap,
            [thingId]: [
              {
                id,
                ...attribute
              }
            ]
          })
        );
      }

      return id;
    },

    getThingAttributes: (thingId: string): Attribute<string>[] =>
      Array.from(thingAttributeMap[thingId]),

    addSystem: <T extends {} = {}>(
      systemProto: Omit<System<T>, "id" | "getNodes">
    ) =>
    {
      const id = uuidv4();

      setSystems(
        (prevSystems) =>
        [
          ...prevSystems,
          {
            id,
            getNodes: () => void null,
            ...systemProto
          }
        ]
      );

      return id;
    },

    update: React.useCallback(
      () =>
        systems.forEach(
          ({ onUpdate }) =>
            onUpdate([])
        ),
      [ systems ]
    ),
  };
};