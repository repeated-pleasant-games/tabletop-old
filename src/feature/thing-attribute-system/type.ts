export type Attribute<T extends string> =
{
  id: string,
  type: T,
};

export type System<T extends { [s: string]: Attribute<string> }> =
{
  id: string,
  getNodes: (attributes: Attribute<string>[]) => T[],
  onUpdate: (nodes: T[]) => void,
};