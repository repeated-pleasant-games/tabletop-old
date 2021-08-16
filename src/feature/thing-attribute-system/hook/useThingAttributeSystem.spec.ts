import { renderHook } from "@testing-library/react-hooks";
import { resolveMotionValue } from "framer-motion";
import { act } from "react-dom/test-utils";

import { Attribute } from "../type";

import { useThingAttributeSystem } from "./useThingAttributeSystem";

describe("useThingAttributeSystem", () =>
{
  describe("createThing", () =>
  {
    it("Returns a uuid.", () =>
    {
      const { result } = renderHook(() => useThingAttributeSystem());

      expect(result.current.createThing()).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      );
    });
  });

  describe("addAttributeToThing", () =>
  {
    it("Returns a uuid", () =>
    {
      const { result } = renderHook(() => useThingAttributeSystem());

      const thing = result.current.createThing();

      let attribute;
      act(() =>
      {
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
      const { result } = renderHook(() => useThingAttributeSystem());

      const thing1 = result.current.createThing();

      let attribute1;
      act(() =>
      {
        attribute1 =
          result.current.addAttributeToThing<Attribute<"test">>(
            thing1,
            { type: "test" }
          );
      });

      const thing2 = result.current.createThing();

      let attribute2;
      act(() =>
      {
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

  describe("addSystem", () =>
  {
    it("Returns a uuid.", () =>
    {
      const { result } = renderHook(() => useThingAttributeSystem());

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
      const { result } = renderHook(() => useThingAttributeSystem());

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
      const { result } = renderHook(() => useThingAttributeSystem());

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