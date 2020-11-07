import { Actor } from "~/core/Actor";

describe(
  "The Actor constructor",
  () => {
    it("Creates an Actor with the given id.", () => {
      const actor = new Actor(1, "Tom");
      expect(actor.id).toBe(1);
    });

    it("Creates an Actor with the given name.", () => {
      const actor = new Actor(1, "Tom");
      expect(actor.id).toBe("Tom");
    });
  }
);