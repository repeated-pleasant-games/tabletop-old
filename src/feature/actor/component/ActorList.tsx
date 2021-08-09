import React from "react";

import {
  Table,
  Tbody,
  Tr,
  Td,
  Box
} from "@chakra-ui/react";

import { useSharedStore } from "@/hook/useSharedStore";

export const ActorList = () =>
{
  const { actors, removeActor } = useSharedStore(({ actors, removeActor }) => ({
    actors,
    removeActor
  }));

  return (
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
            actors
            .sort(
              ({ initiative: a }, { initiative: b }) =>
                Math.sign(b - a)
            )
            .map((actor) =>
              (
                <Tr key={actor.id} onClick={() => removeActor(actor.id)}>
                  <Td>
                    {actor.name}
                  </Td>
                  <Td>
                    {actor.initiative}
                  </Td>
                </Tr>
              )
            )
          }
        </Tbody>
      </Table>
    )
  );
};

export default ActorList;