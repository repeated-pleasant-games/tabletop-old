import React from "react";

export const joinFormTestId = "join-form"

export const JoinForm = () =>
(
  <form data-testid={joinFormTestId}>
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
    />
    <input type="submit" value="Join!" />
  </form>
);

export default JoinForm;