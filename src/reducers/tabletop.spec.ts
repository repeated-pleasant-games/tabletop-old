import { AddActorPayload, SetViewTransformPayload } from "~/actions/tabletop";
import { Actor } from "~/core/Actor";
import { actors, viewTransform } from "./tabletop";

describe("viewTransform reducer", () =>
{
  it("Returns the default state when state is undefined and action is null.", () =>
  {
    expect(viewTransform(undefined, <SetViewTransformPayload>{}))
      .toStrictEqual([
        [ 1, 0, 0 ],
        [ 0, 1, 0 ],
        [ 0, 0, 1 ]
      ]);
  });

  it("Returns the transform that was passed when state is defined.", () =>
  {
    expect(viewTransform(
      [
        [ 1, 0, 0 ],
        [ 0, 1, 0 ],
        [ 0, 0, 1 ],
      ],
      {
        type: "set view transform",
        viewTransform: [
          [ 1, 0, 2 ],
          [ 0, 1, 3 ],
          [ 0, 0, 1 ]
        ],
      }))
      .toStrictEqual([
        [ 1, 0, 2 ],
        [ 0, 1, 3 ],
        [ 0, 0, 1 ]
      ]);
  });

  it("Returns the transform that was passed when state is undefined.", () =>
  {
    expect(viewTransform(
      undefined,
      {
        type: "set view transform",
        viewTransform: [
          [ 1, 0, 2 ],
          [ 0, 1, 3 ],
          [ 0, 0, 1 ]
        ],
      }))
      .toStrictEqual([
        [ 1, 0, 2 ],
        [ 0, 1, 3 ],
        [ 0, 0, 1 ]
      ]);
  });
});

describe("actors reducer", () =>
{
  it("Returns default state when state is undefined and action is empty.", () =>
  {
    expect(
      actors(
        undefined,
        {} as AddActorPayload
      )
    )
    .toStrictEqual(
      []
    );
  });

  it.each([
    [
      [ {} as Actor ],
      {} as Actor
    ],
    [
      [ { id: "", name: "", initiative: 0, x: 0, y: 0 } ],
      { id: "", name: "Actor 1", initiative: 1, x: 0, y: 0 }
    ]
  ])(
    "Returns a list that includes the given actor when state is defined.",
    (initialActorList, actor) =>
    {
      expect(
        actors(
          initialActorList,
          {
            type: "add actor",
            actor
          }
        )
      )
      .toStrictEqual(
        [
          ...initialActorList,
          actor
        ]
      )
    }
  );

  it(
    "Returns a list containing only the given actor when list is undefined",
    () =>
    {
      expect(
        actors(
          undefined,
          {
            type: "add actor",
            actor: {} as Actor
          }
        )
      )
      .toStrictEqual(
        [
          {}
        ]
      )
    }
  );

  it(
    "Removes the actor with a matching id.",
    () =>
    {
      expect(
        actors(
          [
            {
              id: "1",
            } as Actor
          ],
          {
            type: "remove actor",
            id: "1"
          }
        )
      )
      .toStrictEqual(
        []
      );
    }
  )
});