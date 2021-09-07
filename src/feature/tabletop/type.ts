import { Attribute } from "@/feature/thing-attribute-system";

export type PositionAttribute = Attribute<"position"> &
{
  x: number,
  y: number,
};

export type NameAttribute = Attribute<"name"> &
{
  name: string,
};
