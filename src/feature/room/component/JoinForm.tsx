import React from "react";
import { useLocalStore } from "@/hook/useLocalStore";

export const joinFormTestId = "join-form"

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
                      type="text"
                      placeholder="The Dungeon"
                    />
                  </FormControl>
                )
              }
            </Field>
            <Button mt="4" type="submit">Join!</Button>
          </Form>
        )
      }
    </Formik>
  );
}

export default JoinForm;