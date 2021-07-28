import { SetState } from "zustand";

export type RoomState =
{
  room: string,
  setRoom: (roomName: string) => void,
};

export const createRoomState = (set: SetState<RoomState>): RoomState =>
({
  room: "",
  setRoom: (roomName) =>
    set(() => ({ room: roomName })),
});