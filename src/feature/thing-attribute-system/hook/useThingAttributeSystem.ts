import React from "react";

import { v4 as uuidv4 } from "uuid";

import {
  ThingAttributeSystemContext,
} from "../component/ThingAttributeSystemProvider";
import { Attribute, System } from "../type";

type UnionOfAttributeTypes<A extends any[]> =
  A extends [ ...rest: infer R, last: Attribute<infer T> ]
  ? UnionOfAttributeTypes<R> | T
  :
  A extends [ only: Attribute<infer T> ]
  ? T
  : never;

export const useThingAttributeSystem = () =>
{
  const {
    thingAttributeMap, setThingAttributeMap,
    systems, setSystems
  } = React.useContext(ThingAttributeSystemContext);

  return {
    createThing: React.useCallback(
      () =>
      {
        const id = uuidv4();

        setThingAttributeMap(
          (prevMap) =>
          ({
            ...prevMap,
            [id]: []
          })
        );

        return id;
      },
      []
    ),

    getThingsWithAttributeTypes: React.useCallback(
      <A extends Attribute<string>[]>(
        ...attributeTypes: UnionOfAttributeTypes<A>[]
      ): string[] =>
      {
        const uniqueAttributeTypes = Array.from(new Set(attributeTypes));

        return thingAttributeMap === undefined
          ? []
          : Object.entries(thingAttributeMap)
          .filter(
            ([ , attributes ]) =>
            {
              const matchingAttributes =
                attributes
                .filter(
                  ({ type }) =>
                    uniqueAttributeTypes
                    .find(
                      (attributeType) =>
                        type === attributeType
                    ) !== undefined
                );

              return matchingAttributes.length === uniqueAttributeTypes.length;
            }
          )
          .reduce(
            (thingIds, [ thingId, ]) =>
              [
                ...thingIds,
                thingId
              ],
            [] as string[]
          )
      },
      [ thingAttributeMap ]
    ),

    addAttributeToThing: React.useCallback(
      <A extends Attribute<string>>(
        thingId: string,
        attribute: Omit<A, "id">
      ) => 
      {
        const id = uuidv4();

        setThingAttributeMap(
          (prevMap) =>
          ({
            ...prevMap,
            [thingId]: [
              ...prevMap[thingId] ?? [],
              {
                id,
                ...attribute
              }
            ]
          })
        );

        return id;
      },
      [ thingAttributeMap ]
    ),

    getThingAttributes: React.useCallback(
      (thingId: string): Attribute<string>[] =>
        thingAttributeMap[thingId],
      [ thingAttributeMap ]
    ),

    updateThingAttributeOfType: React.useCallback(
      <A extends Attribute<string>>(
        thingId: string,
        attributeType: A["type"],
        protoAttribute: Partial<Omit<A, "id" | "type">>
      ) =>
      {
        setThingAttributeMap(
          (prevMap) =>
          ({
            ...prevMap,
            [thingId]: [
              ...prevMap[thingId].filter(({ type }) => type !== attributeType),
              Object.assign(
                prevMap[thingId].find(({ type }) => type === attributeType),
                protoAttribute
              )
            ],
          })
        );
      },
      []
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