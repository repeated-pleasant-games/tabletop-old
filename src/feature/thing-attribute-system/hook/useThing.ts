import React from "react";

import { Attribute } from "../type";
import { useThingAttributeSystem } from "./useThingAttributeSystem";

import { ThingContext } from "../component/ThingProvider";

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

    getAttributeByType: React.useCallback(
      <A extends Attribute<string>>(type: A["type"]): A =>
        getThingAttributes(thingId).find(
          ({ type: t }) =>
            t === type
        ) as A,
      [ thingId ]
    ),
  }
};