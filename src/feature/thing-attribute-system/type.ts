export type Attribute<T extends string> =
{
  id: string,
  type: T,
};

export type System<T extends { [s: string]: Attribute<string> }> =
{
  id: string,
  getNodes: (thingAttributeMap: { [s: string]: Attribute<string>[] }) => T[],
  onUpdate: (nodes: T[]) => void,
};