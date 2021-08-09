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
        actorName: "",
        initiative: 0,
      }}
      onSubmit={
        ({ actorName, initiative }) =>
          addActor({
            id: uuid(),
            name: actorName,
            initiative: initiative,
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
            <Field name="initiative">
              {
                ({ field, form }: FieldProps) =>
                (
                  <FormControl>
                    <FormLabel
                      id="initiative-label"
                    >
                      Initiative
                    </FormLabel>
                    <Input
                      {...field}
                      id="initiative"
                      type="number"
                      aria-labelledby="initiative-label"
                      value={0}
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