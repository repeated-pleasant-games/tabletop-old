import React from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import {
  FormControl, 
  FormLabel,
  Input,
  Button,
  Table,
  Tbody,
  Tr,
  Td,
  Container,
  Box
} from "@chakra-ui/react";

import { v4 as uuid } from "uuid";

import { useSharedStore } from "@/hook/useSharedStore";

export const ActorPanel = (): any =>
{
  const { actors, addActor, removeActor } = useSharedStore();

  return (
    <>
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
      <Container mt="4" maxHeight="300px" overflowY="auto">
        {
          (!actors || actors.length === 0)
          ? (
            <Box
              textAlign="center"
              textStyle="italic"
              color="gray.500"
            >
              ... No actors ...
            </Box>
          )
          : (
            <Table variant="simple" size="sm">
              <Tbody>
                {
                  actors.map((actor) =>
                    (
                      <Tr key={actor.id}>
                        <Td onClick={() => removeActor(actor.id)}>
                          {actor.name}
                        </Td>
                      </Tr>
                    )
                  )
                }
              </Tbody>
            </Table>
          )
        }
      </Container>
    </>
  );
};

export default ActorPanel;