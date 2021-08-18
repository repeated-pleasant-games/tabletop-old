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
      },

      updateThingAttributeOfType: <A extends Attribute<string>>(
        thingId: string,
        attributeType: A["type"],
        protoAttribute: Partial<Omit<A, "id" | "type">>
      ) =>
      {
        const attribute = thingAttributeMap[thingId].find(
          ({ type }) => type === attributeType
        );

        thingAttributeMap[thingId] =
          [
            ...(
              thingAttributeMap[thingId].filter(
                ({ type }) => type !== attributeType
              ) ?? []
            ),
            {
              ...attribute,
              ...protoAttribute
            }
          ];
      }
    })
  ),
}));
import { useThingAttributeSystem } from "./useThingAttributeSystem";

import { ThingProvider } from "../component/ThingProvider";
import { useThing } from "./useThing";
import { act } from "react-dom/test-utils";

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

  it("Returns a function for finding attributes.", () =>
  {
    const { createThing, addAttributeToThing } = useThingAttributeSystem();

    const thingId = createThing();

    const attributeIds =
      [
        {
          type: "test1",
        },
        {
          type: "test2",
        },
        {
          type: "test3",
        }
      ].map((attribute) => addAttributeToThing(thingId, attribute));

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

    expect(
      result.current.getAttributeByType<Attribute<"test2">>("test2")
    ).toEqual(
      {
        id: attributeIds[1],
        type: "test2",
      }
    );
  });

  it("Returns a function for updating attributes.", () =>
  {
    const { createThing, addAttributeToThing } = useThingAttributeSystem();

    type PositionAttribute = Attribute<"position"> &
    {
      x: number,
      y: number,
    };

    const thingId = createThing();
    const attributeId = addAttributeToThing<PositionAttribute>(
      thingId,
      {
        type: "position",
        x: 0,
        y: 0,
      }
    );

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

    act(() =>
    {
      result.current.updateAttributeOfType<PositionAttribute>(
        "position",
        {
          x: 1,
        }
      );
    });

    expect(
      result.current.getAttributeByType<PositionAttribute>("position")
    ).toEqual(
      {
        id: attributeId,
        type: "position",
        x: 1,
        y: 0,
      }
    );
  });
});