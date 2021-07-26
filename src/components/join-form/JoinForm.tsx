import React from "react";
import { useLocalStore } from "~/store/local";

export const joinFormTestId = "join-form"

export const JoinForm = () =>
{
  const { setRoom } = useLocalStore();
  const [ roomName, setRoomName ] = React.useState("");

  const submitHandler = () =>
  {
    console.log(roomName);
    setRoom(roomName);
  };

  return (
    <form data-testid={joinFormTestId} onSubmit={submitHandler}>
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
      <input type="submit" value="Join!"/>
    </form>
  );
}

export default JoinForm;