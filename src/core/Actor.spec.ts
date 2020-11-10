import { Actor } from "~/core/Actor";

describe(
  "The Actor constructor",
  () => {
    it("Creates an Actor with the given id, name, and initiative.", () => {
      const actor = new Actor(1, "Tom", 2);

      expect(actor.id).toBe(1);
      expect(actor.name).toBe("Tom");
      expect(actor.initiative).toBe(2);
      expect(actor.x).toBe(0);
      expect(actor.y).toBe(0);
    });

    it("Creates an Actor with the given id, name, initiaitive, x, and y.",
      () => {
        const actor = new Actor(1, "Tom", 2, 10, 11);

      expect(actor.id).toBe(1);
      expect(actor.name).toBe("Tom");
      expect(actor.initiative).toBe(2);
      expect(actor.x).toBe(10);
      expect(actor.y).toBe(11);
      });
  }
);