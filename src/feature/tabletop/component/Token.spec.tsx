import * as React from "react";
import { fireEvent } from "@testing-library/react";
import { renderSVG } from "~/test-utilities";
import "@testing-library/jest-dom/extend-expect";

import "~/pointer-event";

import { useLocalStore } from "@/hook/useLocalStore";
import { identityTransform, scale, translation } from "@/lib/Transform";

import Token, { Token as DisconnectedToken, tokenTestId } from "./Token";
import { Actor } from "@/lib/Actor";
import { useUseSharedStore } from "@/context/SharedStore";

describe("Token", () =>
{
  it("Has a SVG rect.", () =>
  {
    const { getByTestId } = renderSVG(
      <DisconnectedToken
        x={0}
        y={0}
        setPosition={() => {}}
        cellSize={1}
      />
    );

    expect(getByTestId(tokenTestId).nodeName).toEqual("rect");
  });

  it("Has given x and y coordinates.", () =>
  {
    const { getByTestId } = renderSVG(
      <DisconnectedToken
        x={10}
        y={11}
        setPosition={() => {}}
        cellSize={1}
      />
    );

    expect(getByTestId(tokenTestId)).toHaveAttribute("x", "10");
    expect(getByTestId(tokenTestId)).toHaveAttribute("y", "11");
  });

  it("Has a width and height equal to the given cell size.", () =>
  {
    const { getByTestId } = renderSVG(
      <DisconnectedToken
        x={0}
        y={0}
        setPosition={() => {}}
        cellSize={16}
      />
    );

    expect(getByTestId(tokenTestId)).toHaveAttribute("width", "16");
    expect(getByTestId(tokenTestId)).toHaveAttribute("height", "16");
  });

  it("Follows pointer when user clicks and drags.", () =>
  {
    const setPosition = jest.fn();

    const { getByTestId } = renderSVG(
      <DisconnectedToken
        x={0}
        y={0}
        setPosition={setPosition}
        cellSize={16}
      />
    );

    const token = getByTestId(tokenTestId);

    fireEvent.pointerDown(token, { button: 0 });
    fireEvent.pointerMove(token, { clientX: 20, clientY: 20 });

    expect(setPosition).toHaveBeenCalledWith(20, 20);
  });

  it("Follows pointer when user clicks and drags, relative to cursor.", () =>
  {
    const setPosition = jest.fn();

    const { getByTestId } = renderSVG(
      <DisconnectedToken
        x={0}
        y={0}
        setPosition={setPosition}
        cellSize={16}
      />
    );

    const token = getByTestId(tokenTestId);

    fireEvent.pointerDown(token, { button: 0, clientX: 8, clientY: 4 });
    fireEvent.pointerMove(token, { clientX: 20, clientY: 20 });

    expect(setPosition).toHaveBeenCalledWith(12, 16);
  });

  it("Does not follow pointer when pointer is not down.", () =>
  {
    const setPosition = jest.fn();
    
    const { getByTestId } = renderSVG(
      <DisconnectedToken
        x={0}
        y={0}
        setPosition={() => {}}
        cellSize={16}
      />
    );

    const token = getByTestId(tokenTestId);

    fireEvent.pointerMove(token, { clientX: 20, clientY: 20 });

    expect(setPosition).not.toHaveBeenCalled();
  });

  it("Does not follow pointer after pointer is released.", () =>
  {
    const setPosition = jest.fn();

    const { getByTestId } = renderSVG(
      <DisconnectedToken
        x={0}
        y={0}
        setPosition={setPosition}
        cellSize={16}
      />
    );

    const token = getByTestId(tokenTestId);

    fireEvent.pointerDown(token);
    fireEvent.pointerUp(token);
    fireEvent.pointerMove(token, { clientX: 20, clientY: 20 });

    expect(setPosition).not.toHaveBeenCalled();
  });

  it("Does not follow pointer if button 0 is not pressed.", () =>
  {
    const setPosition = jest.fn();

    const { getByTestId } = renderSVG(
      <DisconnectedToken
        x={0}
        y={0}
        setPosition={setPosition}
        cellSize={16}
      />
    );

    const token = getByTestId(tokenTestId);

    fireEvent.pointerDown(token, { button: 1 });
    fireEvent.pointerMove(token, { clientX: 20, clientY: 20 });

    expect(setPosition).not.toHaveBeenCalled();
  });

  it("Does not stop following pointer if button release is not 0.", () =>
  {
    const setPosition = jest.fn();

    const { getByTestId } = renderSVG(
      <DisconnectedToken
        x={0}
        y={0}
        setPosition={setPosition}
        cellSize={16}
      />
    );

    const token = getByTestId(tokenTestId);

    fireEvent.pointerDown(token, { button: 0 });
    fireEvent.pointerUp(token, { button: 1 });
    fireEvent.pointerMove(token, { clientX: 20, clientY: 20 });

    expect(setPosition).toHaveBeenCalledWith(20, 20);
  });

  beforeEach(() =>
  {
    global.Element.prototype.setPointerCapture = (): any => null;
    global.Element.prototype.releasePointerCapture = (): any => null;
  });

  it("Captures pointer on pointer down.", () =>
  {
    const pointerId = 12;

    const { getByTestId } = renderSVG(
      <DisconnectedToken
        x={0}
        y={0}
        setPosition={() => {}}
        cellSize={16}
      />
    );

    const f = jest.fn();
    global.Element.prototype.setPointerCapture = f;

    const token = getByTestId(tokenTestId);
    fireEvent.pointerDown(token, { pointerId });

    expect(f).toHaveBeenCalled();
    expect(f).toHaveBeenNthCalledWith(1, pointerId);
  });

  it("Does not capture pointer on pointer down if button is not 0.", () =>
  {
    const pointerId = 12;

    const { getByTestId } = renderSVG(
      <DisconnectedToken
        x={0}
        y={0}
        setPosition={() => {}}
        cellSize={16}
      />
    );

    const f = jest.fn();
    global.Element.prototype.setPointerCapture = f;

    const token = getByTestId(tokenTestId);
    fireEvent.pointerDown(token, { pointerId, button: 1 });

    expect(f).not.toHaveBeenCalled();
  });

  it("Releases pointer capture on pointer up.", () =>
  {
    const pointerId = 12;

    const { getByTestId } = renderSVG(
      <DisconnectedToken
        x={0}
        y={0}
        setPosition={() => {}}
        cellSize={16}
      />
    );

    const f = jest.fn();
    global.Element.prototype.releasePointerCapture = f;

    const token = getByTestId(tokenTestId);
    fireEvent.pointerDown(token, { pointerId });
    fireEvent.pointerUp(token, { pointerId });

    expect(f).toHaveBeenCalled();
    expect(f).toHaveBeenNthCalledWith(1, pointerId);
  });

  it("Does not release pointer on pointer up if button is not 0.", () =>
  {
    const pointerId = 12;

    const { getByTestId } = renderSVG(
      <DisconnectedToken
        x={0}
        y={0}
        setPosition={() => {}}
        cellSize={16}
      />
    );

    const f = jest.fn();
    global.Element.prototype.releasePointerCapture = f;

    const token = getByTestId(tokenTestId);
    fireEvent.pointerDown(token, { pointerId, button: 0 });
    fireEvent.pointerUp(token, { pointerId, button: 1 });

    expect(f).not.toHaveBeenCalled();
  });

  it("Has transform attribute equal to viewTransform.", () =>
  {
    const { getByTestId } = renderSVG(
      <Token
        x={0}
        y={0}
        setPosition={() => {}}
        cellSize={16}
      />
    );

    expect(getByTestId(tokenTestId))
      .toHaveAttribute("transform", "matrix(1,0,0,1,0,0)");
  });

  it("Adjusts pointer x and y using viewTransform.", () =>
  {
    useLocalStore.getState().setViewTransform(translation(10, 20));

    const setPosition = jest.fn();

    const { getByTestId } = renderSVG(
      <Token
        x={0}
        y={0}
        setPosition={setPosition}
        cellSize={16}
      />
    );

    const token = getByTestId(tokenTestId);

    fireEvent.pointerDown(token, { clientX: 10, clientY: 20 });
    fireEvent.pointerMove(token, { clientX: 4, clientY: 3 });

    expect(setPosition).toHaveBeenCalledWith(
      /* 4 - 10 = */ -6,
      /* 3 - 20 = */ -17
    );
  });

  it.each([
    [
      translation(0, 0),
      [ 8, 4 ],
      [ 20, 20 ],
      [ 12, 16 ]
    ],
    [
      translation(0, 10),
      [ 8, 14 ],
      [ 20, 30 ],
      [ 12, 16 ]
    ],
    [
      scale(2),
      [ 8, 4 ],
      [ 20, 20 ],
      [ 6, 8 ]
    ],
    [
      scale(0.5),
      [ 4, 2 ],
      [ 20, 20 ],
      [ 32, 36 ]
    ]
  ])(
    "Follows pointer when user clicks and drags, relative to cursor. (#%#)",
    (transform, [ initX, initY ], [ endX, endY ], [ expectedX, expectedY ]) =>
    {
      const useSharedStore = useUseSharedStore();

      useSharedStore.setState(() => ({ actors: [] }));
      useSharedStore.getState().addActor({ id: "1", x: 0, y: 0 } as Actor);
      useLocalStore.getState().setViewTransform(transform);

      const Component = () =>
      {
        const useSharedStore = useUseSharedStore();

        const { x, y } = useSharedStore((state) =>
        {
          const index = state.actors.findIndex(({ id }) => id === "1");
          
          return {
            x: state.actors[index].x,
            y: state.actors[index].y,
          }
        });

        return (
          <Token
            x={x}
            y={y}
            setPosition={
              (x, y) =>
                useSharedStore.getState().setActorPosition("1", x, y)
            }
            cellSize={16}
          />
        );
      };

      const { getByTestId } = renderSVG(<Component />);

      const token = getByTestId(tokenTestId);

      fireEvent.pointerDown(
        token,
        {
          button: 0,
          clientX: initX,
          clientY: initY
        }
      );
      fireEvent.pointerMove(
        token,
        {
          clientX: endX,
          clientY: endY
        }
      );

      expect(token).toHaveAttribute("x", expectedX.toString());
      expect(token).toHaveAttribute("y", expectedY.toString());
    }
  );

  it("Snaps to grid when snapToGrid is true", () =>
  {
    const useSharedStore = useUseSharedStore();

    useSharedStore.setState(() => ({ actors: [] }));
    useSharedStore.getState().addActor({ id: "1", x: 0, y: 0 } as Actor);

    useLocalStore.getState().setViewTransform(identityTransform());
    useLocalStore.getState().setSnapToGrid(true);

    const Component = () =>
    {
      const useSharedStore = useUseSharedStore();

      const { x, y } = useSharedStore((state) =>
      {
        const index = state.actors.findIndex(({ id }) => id === "1");
        
        return {
          x: state.actors[index].x,
          y: state.actors[index].y,
        }
      });

      return (
        <Token
          x={x}
          y={y}
          setPosition={
            (x, y) =>
              useSharedStore.getState().setActorPosition("1", x, y)
          }
          cellSize={16}
        />
      );
    };

    const { getByTestId } = renderSVG(<Component />);

		const token = getByTestId(tokenTestId);

		fireEvent.pointerDown(
			token,
			{
				button: 0,
				clientX: 0,
				clientY: 0,
			}
		);
		fireEvent.pointerMove(
			token,
			{
				clientX: 18,
				clientY: 20,
			}
		);

		expect(token).toHaveAttribute("x", "16");
		expect(token).toHaveAttribute("y", "16");
  });
});