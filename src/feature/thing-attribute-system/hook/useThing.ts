import React from "react";

import { ThingContext } from "../component/ThingProvider";
import { useThingAttributeSystem } from "./useThingAttributeSystem";

export const useThing = () =>
{
  const thingId = React.useContext(ThingContext);

  const { getThingAttributes } = useThingAttributeSystem();

  return {
    attributes: React.useMemo(
      () =>
        getThingAttributes(thingId),
      [ thingId ]
    ),
  }
};