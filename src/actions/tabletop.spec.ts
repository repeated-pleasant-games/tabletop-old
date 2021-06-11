import { Actor } from "~/core/Actor";
import { addActor, removeActor, setSnapToGrid, setViewTransform } from "./tabletop";

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

describe("removeActor", () =>
{
  it("Returns a payload with 'type' of 'remove actor'.", () =>
  {
    expect(removeActor("1").type).toBe("remove actor");
  });

  it("Returns a payload whose id is the given id.", () =>
  {
    expect(removeActor("1").id).toBe("1");
  });
});

describe("setSnapToGrid", () =>
{
	it("Returns a payload with 'type' of 'set snap to grid'.", () =>
	{
		expect(setSnapToGrid(false).type).toBe("set snap to grid");
	});

	it.each([
		[ false ],
		[ true ]
	])("Returns a payload whose value is the given boolean.", (value) =>
	{
		expect(setSnapToGrid(value).snapToGrid).toBe(value);
	});
});