import React from "react";
import { Container, } from "@chakra-ui/react";

import AddActorForm from "./AddActorForm";
import ActorList from "./ActorList";

export const ActorPanel = (): any =>
(
  <>
    <AddActorForm />
    <Container mt="4" maxHeight="300px" overflowY="auto">
      <ActorList />
    </Container>
  </>
);

export default ActorPanel;