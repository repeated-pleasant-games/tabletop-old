import React from "react";

import { Formik, Form, Field, FieldProps } from "formik";
import {
  FormControl, 
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

import { v4 as uuid } from "uuid";
import { useSharedStore } from "@/hook/useSharedStore";

export const AddActorForm = () =>
{
  const addActor = useSharedStore((state) => state.addActor);

  return (
    <Formik
      initialValues={{
        actorName: ""
      }}
      onSubmit={
        ({ actorName }) =>
          addActor({
            id: uuid(),
            name: actorName,
            initiative: 0,
            x: 0,
            y: 0,
          })
      }
    >
      {
        (props) =>
        (
          <Form>
            <Field name="actorName">
              {
                ({ field, form }: FieldProps) =>
                (
                  <FormControl>
                    <FormLabel
                      id="actor-name-label"
                    >
                      Actor Name
                    </FormLabel>
                    <Input
                      {...field}
                      id="actor-name"
                      aria-labelledby="actor-name-label"
                      placeholder="Actor"
                    />
                  </FormControl>
                )
              }
            </Field>
            <Button mt="2" type="submit">Add Actor</Button>
          </Form>
        )
      }
    </Formik>
  );
};

export default AddActorForm;