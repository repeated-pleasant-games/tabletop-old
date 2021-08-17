import React from "react";

import { v4 as uuidv4 } from "uuid";

import {
  ThingAttributeSystemContext,
} from "../component/ThingAttributeSystemProvider";
import { Attribute, System } from "../type";

export const useThingAttributeSystem = () =>
{
  const {
    thingAttributeMap, setThingAttributeMap,
    systems, setSystems
  } = React.useContext(ThingAttributeSystemContext);

  return {
    createThing: React.useCallback(
      () =>
        uuidv4(),
      []
    ),

    addAttributeToThing: React.useCallback(
      <A extends Attribute<string>>(
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
      [ thingAttributeMap ]
    ),

    getThingAttributes: React.useCallback(
      (thingId: string): Attribute<string>[] =>
        thingAttributeMap[thingId],
      [ thingAttributeMap ]
    ),

    addSystem: React.useCallback(
      <T extends { [s: string]: Attribute<string> } = {}>(
        systemProto: Omit<System<T>, "id" | "getNodes">,
        filters: {
          [Property in keyof T]: (attributes: Attribute<string>[]) => T[Property]
        }
      ) =>
      {
        const id = uuidv4();

        setSystems(
          (prevSystems) =>
          [
            ...prevSystems,
            {
              id,
              getNodes: (thingAttributeMap) =>
                Object.entries(thingAttributeMap).map(
                  ([ , attributes ]) =>
                  {
                    const node = {};

                    Object.entries(filters).forEach(
                      ([ nodeProp, filter ]) =>
                      {
                        Object.assign(
                          node,
                          {
                            [nodeProp]: filter(attributes)
                          }
                        )
                      }
                    );

                    return node;
                  }
                ),
              ...systemProto
            }
          ]
        );

        return id;
      },
      []
    ),

    update: React.useCallback(
      () =>
        systems.forEach(
          ({ onUpdate, getNodes }) =>
            onUpdate(getNodes(thingAttributeMap))
        ),
      [ systems, thingAttributeMap ]
    ),
  };
};