import { Actor } from "~/core/Actor";
import { addActor, setViewTransform } from "./tabletop";

describe("Action setViewTransform", () =>
{
  it("Returns a payload with 'type' of 'set view transform'", () =>
  {
    expect(setViewTransform([
      [ 1, 0, 0 ],
      [ 0, 1, 0 ],
      [ 0, 0, 1 ]
    ]).type).toBe("set view transform");
  });

  it("Returns a payload whose view transform is the given transform.", () =>
  {
    expect(setViewTransform(
      [
        [ 1, 0, 10 ],
        [ 0, 1,  2 ],
        [ 0, 0,  1 ]
      ]).viewTransform)
      .toStrictEqual([
        [ 1, 0, 10 ],
        [ 0, 1,  2 ],
        [ 0, 0,  1 ]
      ]);
  });
});

describe("addActor", () =>
{
  it("Returns a payload with 'type' of 'add actor'.", () =>
  {
    expect(addActor({} as Actor).type).toBe("add actor");
  });

  it("Returns a payload whose actor is the given actor.", () =>
  {
    expect(
      addActor({
        id: "",
        name: "",
        initiative: 0,
        x: 0,
        y: 0,
      }).actor
    ).toStrictEqual({
      id: "",
      name: "",
      initiative: 0,
      x: 0,
      y: 0,
    });
  });
});