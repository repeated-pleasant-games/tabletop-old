import { ThingAttributeSystemProvider } from "@/feature/thing-attribute-system";
import React from "react";

import { SharedStoreProvider } from "@/feature/store-shared";
import { useSharedStore } from "@/hook/useSharedStore";

const Inner = ({ children }: { children: React.ReactNode }) =>
{
  const thingAttributeSystemSlice = useSharedStore(({
    thingAttributeMap,
    setThingAttributeMap,
    systems,
    setSystems
  }) => ({
    thingAttributeMap,
    setThingAttributeMap,
    systems,
    setSystems,
  }))

  return (
    <ThingAttributeSystemProvider value={thingAttributeSystemSlice}>
      {children}
    </ThingAttributeSystemProvider>
  );
};

export const AppProvider = ({ children, room }: { children: React.ReactNode, room: string }) =>
(
  <SharedStoreProvider room={room}>
    <Inner>
      {children}
    </Inner>
  </SharedStoreProvider>
);