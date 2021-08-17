import React from "react";
import { renderHook } from "@testing-library/react-hooks";

import { v4 as uuidv4 } from "uuid";

import { Attribute } from "../type";

const thingAttributeMap: { [s: string]: Attribute<string>[] } = {};

jest.doMock("./useThingAttributeSystem", () => ({
  __esmodule: true,
  useThingAttributeSystem: jest.fn().mockImplementation(
    () =>
    ({
      createThing: () => 
      {
        const id = uuidv4();

        thingAttributeMap[id] = [];

        return id;
      },

      getThingAttributes: (thingId: string): Attribute<string>[] =>
        thingAttributeMap[thingId],

      addAttributeToThing: <A extends Attribute<string>>(
        thingId: string,
        protoAttribute: Omit<A, "id">
      ) =>
      {
        const id = uuidv4();

        thingAttributeMap[thingId] = 
          [
            ...(
              thingAttributeMap[thingId] ?? []
            ),
            {
              id,
              ...protoAttribute
            }
          ];

        return id;
      }
    })
  ),
}));
import { useThingAttributeSystem } from "./useThingAttributeSystem";

import { ThingProvider } from "../component/ThingProvider";
import { useThing } from "./useThing";

describe("useThing", () =>
{
  it.each([
    [
      [],
    ],
    [
      [
        {
          type: "test",
        }
      ],
    ],
    [
      [
        {
          type: "test",
        },
        {
          type: "test2",
        },
        {
          type: "test3",
        }
      ],
    ],
  ])(
    "Returns a list of attributes. (#%#)",
    (attributes: Omit<Attribute<string>, "id">[]) =>
    {
      const { createThing, addAttributeToThing } = useThingAttributeSystem();

      const thingId = createThing();

      attributes.forEach((attribute) =>
      {
        addAttributeToThing(thingId, attribute);
      });

      const { result, } = renderHook(
        () => useThing(),
        {
          wrapper: ({ children }) =>
          (
            <ThingProvider thingId={thingId}>
              {children}
            </ThingProvider>
          )
        }
      );

      expect(result.current.attributes).toEqual(thingAttributeMap[thingId]);
    }
  );
});