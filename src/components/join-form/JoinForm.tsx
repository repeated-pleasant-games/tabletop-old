import React from "react";
import { useLocalStore } from "~/store/local";

export const joinFormTestId = "join-form"

export const JoinForm = () =>
{
  const { setRoom } = useLocalStore();
  const [ roomName, setRoomName ] = React.useState("");

  return (
    <form data-testid={joinFormTestId} onSubmit={() => setRoom(roomName)}>
      <label
        id="room-name-label"
      >
        Room Name
      </label>
      <input
        type="text"
        name="room-name"
        aria-labelledby="room-name-label"
        id="room-name-input"

        value={roomName}
        onChange={({ target }) => setRoomName(target.value)}
      />
      <input type="submit" value="Join!" />
    </form>
  );
}

export default JoinForm;