import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";

import {
  ThingAttributeSystemProvider
} from "../component/ThingAttributeSystemProvider";
import { Attribute, System } from "../type";

import { useThingAttributeSystem } from "./useThingAttributeSystem";

describe("useThingAttributeSystem", () =>
{
  describe("createThing", () =>
  {
    it("Returns a uuid.", () =>
    {
      const { result } = renderHook(
        () => useThingAttributeSystem(),
        {
          wrapper: ({ children }) => {
            const [ thingAttributeMap, setThingAttributeMap ] =
              React.useState<{ [s: string]: Attribute<string>[] }>({})

            const [ systems, setSystems ] = React.useState<System<any>[]>([]);
            
            return (
              <ThingAttributeSystemProvider value={{
                thingAttributeMap,
                setThingAttributeMap,
                systems,
                setSystems,
              }}>
                {children}
              </ThingAttributeSystemProvider>
            );
          }
        }
      );

      act(() =>
      {
        expect(result.current.createThing()).toMatch(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
        );
      })
    });

    it("Adds empty entry to thing attribute map.", () =>
    {
      let thingAttributeMap: { [s: string]: Attribute<string>[] };

      const { result } = renderHook(
        () => useThingAttributeSystem(),
        {
          wrapper: ({ children }) => {
            const [ _thingAttributeMap, setThingAttributeMap ] =
              React.useState<{ [s: string]: Attribute<string>[] }>({})

            thingAttributeMap = _thingAttributeMap;

            const [ systems, setSystems ] = React.useState<System<any>[]>([]);
            
            return (
              <ThingAttributeSystemProvider value={{
                thingAttributeMap: _thingAttributeMap,
                setThingAttributeMap,
                systems,
                setSystems,
              }}>
                {children}
              </ThingAttributeSystemProvider>
            );
          }
        }
      );

      let thingId: string;
      act(() =>
      {
        thingId = result.current.createThing();
      });

      expect(thingAttributeMap[thingId]).toEqual([]);
    });
  });

  describe("getThingsWithAttributeTypes", () =>
  {
    it("Returns a list of thing IDs.", () =>
    {
      const { result } = renderHook(
        () => useThingAttributeSystem(),
        {
          wrapper: ({ children }) => {
            const [ thingAttributeMap, setThingAttributeMap ] =
              React.useState<{ [s: string]: Attribute<string>[] }>({})

            const [ systems, setSystems ] = React.useState<System<any>[]>([]);
            
            return (
              <ThingAttributeSystemProvider value={{
                thingAttributeMap,
                setThingAttributeMap,
                systems,
                setSystems,
              }}>
                {children}
              </ThingAttributeSystemProvider>
            );
          }
        }
      );

      let thing1;
      let thing2;
      let thing3;
      act(() =>
      {
        thing1 = result.current.createThing();
        result.current.addAttributeToThing(
          thing1,
          {
            type: "test"
          }
        );

        thing2 = result.current.createThing();
        result.current.addAttributeToThing(
          thing2,
          {
            type: "notTest"
          }
        );

        thing3 = result.current.createThing();
        result.current.addAttributeToThing(
          thing3,
          {
            type: "test"
          }
        );
      });

      expect(
        result.current.getThingsWithAttributeTypes<[
          Attribute<"test">
        ]>(
          "test",
          "test"
        )
      ).toEqual([
        thing1,
        thing3
      ])
    });
  });

  describe("addAttributeToThing", () =>
  {
    it("Returns a uuid", () =>
    {
      const { result } = renderHook(
        () => useThingAttributeSystem(),
        {
          wrapper: ({ children }) => {
            const [ thingAttributeMap, setThingAttributeMap ] =
              React.useState<{ [s: string]: Attribute<string>[] }>({})

            const [ systems, setSystems ] = React.useState<System<any>[]>([]);
            
            return (
              <ThingAttributeSystemProvider value={{
                thingAttributeMap,
                setThingAttributeMap,
                systems,
                setSystems,
              }}>
                {children}
              </ThingAttributeSystemProvider>
            );
          }
        }
      );


      let attribute;
      act(() =>
      {
        const thing = result.current.createThing();

        attribute =
          result.current.addAttributeToThing<Attribute<"">>(
            thing,
            { type: "" }
          );
      })

      expect(attribute).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      );
    });
  });

  describe("getThingAttributes", () => 
  {
    it("Returns a list of attributes belonging to the provided thing.", () =>
    {
      const { result } = renderHook(
        () => useThingAttributeSystem(),
        {
          wrapper: ({ children }) => {
            const [ thingAttributeMap, setThingAttributeMap ] =
              React.useState<{ [s: string]: Attribute<string>[] }>({})

            const [ systems, setSystems ] = React.useState<System<any>[]>([]);
            
            return (
              <ThingAttributeSystemProvider value={{
                thingAttributeMap,
                setThingAttributeMap,
                systems,
                setSystems,
              }}>
                {children}
              </ThingAttributeSystemProvider>
            );
          }
        }
      );

      let thing1, attribute1;
      act(() =>
      {
        thing1 = result.current.createThing();

        attribute1 =
          result.current.addAttributeToThing<Attribute<"test">>(
            thing1,
            { type: "test" }
          );
      });

      let thing2, attribute2;
      act(() =>
      {
        thing2 = result.current.createThing();

        attribute2 =
          result.current.addAttributeToThing<Attribute<"test">>(
            thing2,
            { type: "test" }
          );
      });

      expect(
        result.current.getThingAttributes(thing1)
      ).toEqual([
        {
          id: attribute1,
          type: "test"
        }
      ]);
      expect(
        result.current.getThingAttributes(thing2)
      ).toEqual([
        {
          id: attribute2,
          type: "test"
        }
      ]);
    });
  });

  describe("updateThingAttributeOfType", () =>
  {
    it("Updates an attribute.", async () =>
    {
      const { result, waitForNextUpdate } = renderHook(
        () => useThingAttributeSystem(),
        {
          wrapper: ({ children }) => {
            const [ thingAttributeMap, setThingAttributeMap ] =
              React.useState<{ [s: string]: Attribute<string>[] }>({})

            const [ systems, setSystems ] = React.useState<System<any>[]>([]);
            
            return (
              <ThingAttributeSystemProvider value={{
                thingAttributeMap,
                setThingAttributeMap,
                systems,
                setSystems,
              }}>
                {children}
              </ThingAttributeSystemProvider>
            );
          }
        }
      );

      type PositionAttribute = Attribute<"position"> &
      {
        x: number,
        y: number,
      };

      let thing: string;
      let positionAttribute: PositionAttribute;
      await act(async () =>
      {
        thing = result.current.createThing();
        result.current.addAttributeToThing<PositionAttribute>(
          thing,
          {
            type: "position",
            x: 0,
            y: 0,
          }
        );

        await waitForNextUpdate();

        result.current.updateThingAttributeOfType<PositionAttribute>(
          thing,
          "position",
          {
            x: 1,
          }
        );

        positionAttribute =
          (result.current.getThingAttributes(thing)[0] as PositionAttribute)
      });

      expect(positionAttribute.x).toBe(1);
      expect(positionAttribute.y).toBe(0);
    });
  });

  describe("addSystem", () =>
  {
    it("Returns a uuid.", () =>
    {
      const { result } = renderHook(
        () => useThingAttributeSystem(),
        {
          wrapper: ({ children }) => {
            const [ thingAttributeMap, setThingAttributeMap ] =
              React.useState<{ [s: string]: Attribute<string>[] }>({})

            const [ systems, setSystems ] = React.useState<System<any>[]>([]);
            
            return (
              <ThingAttributeSystemProvider value={{
                thingAttributeMap,
                setThingAttributeMap,
                systems,
                setSystems,
              }}>
                {children}
              </ThingAttributeSystemProvider>
            );
          }
        }
      );

      let system;
      act(() =>
      {
        system = result.current.addSystem(
          {
            onUpdate: () => void null,
          },
          {}
        );
      });

      expect(system).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      );
    });
  });

  describe("update", () =>
  {
    it("Invokes all onUpdate callbacks for registered systems.", () =>
    {
      const { result } = renderHook(
        () => useThingAttributeSystem(),
        {
          wrapper: ({ children }) => {
            const [ thingAttributeMap, setThingAttributeMap ] =
              React.useState<{ [s: string]: Attribute<string>[] }>({})

            const [ systems, setSystems ] = React.useState<System<any>[]>([]);
            
            return (
              <ThingAttributeSystemProvider value={{
                thingAttributeMap,
                setThingAttributeMap,
                systems,
                setSystems,
              }}>
                {children}
              </ThingAttributeSystemProvider>
            );
          }
        }
      );

      const onUpdate = jest.fn();

      act(() =>
      {
        result.current.addSystem(
          {
            onUpdate,
          },
          {}
        );
      });

      result.current.update();

      expect(onUpdate).toHaveBeenCalled();
    });

    it("Provides nodes that match the attribute filters of each system.", () =>
    {
      const { result } = renderHook(
        () => useThingAttributeSystem(),
        {
          wrapper: ({ children }) => {
            const [ thingAttributeMap, setThingAttributeMap ] =
              React.useState<{ [s: string]: Attribute<string>[] }>({})

            const [ systems, setSystems ] = React.useState<System<any>[]>([]);
            
            return (
              <ThingAttributeSystemProvider value={{
                thingAttributeMap,
                setThingAttributeMap,
                systems,
                setSystems,
              }}>
                {children}
              </ThingAttributeSystemProvider>
            );
          }
        }
      );

      const onUpdate = jest.fn();

      let thing;
      let attribute;
      act(() =>
      {
        thing = result.current.createThing();
        attribute = result.current.addAttributeToThing(
          thing,
          {
            type: "test"
          }
        );

        result.current.addSystem<{
          attribute: Attribute<"test">
        }>(
          {
            onUpdate,
          },
          {
            attribute: (attributes) =>
              attributes.find(
                (attribute): attribute is Attribute<"test"> =>
                  attribute.type === "test"
              )
          }
        );
      });

      result.current.update();

      expect(onUpdate).toHaveBeenCalledWith([
        {
          attribute: {
            id: attribute,
            type: "test",
          },
        }
      ]);
    });
  });
});