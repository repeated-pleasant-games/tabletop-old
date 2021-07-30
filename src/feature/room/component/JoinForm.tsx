import React from "react";
import { useLocalStore } from "@/hook/useLocalStore";

export const joinFormTestId = "join-form"

import "./JoinForm.module.css";

import { Formik, Form, Field, FormikProps, FieldProps } from "formik";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

export const JoinForm = () =>
{
  const { setRoom } = useLocalStore(({ setRoom }) =>
  ({
    setRoom,
  }));

  return (
    <Formik
      initialValues={{
        room: ""
      }}
      onSubmit={({ room }, actions) => setRoom(room)}
    >
      {
        (props: FormikProps<any>) =>
        (
          <Form data-testid={joinFormTestId}>
            <Field name="room">
              {
                ({ field, form }: FieldProps) =>
                (
                  <FormControl>
                    <FormLabel id="room-name-label">Room Name</FormLabel>
                    <Input
                      {...field}
                      id="room-name"
                      aria-labelledby="room-name-label"
                      placeholder="The Dungeon"
                    />
                  </FormControl>
                )
              }
            </Field>
            <Button type="submit">Join!</Button>
          </Form>
        )
      }
    </Formik>
  );
}

/*
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
*/

export default JoinForm;