import create from "zustand";
import yjs from "zustand-middleware-yjs";

import * as Y from "yjs";

import { ActorState, createActorState } from "@/feature/actor";
import {
  createThingAttributeSystemState,
  ThingAttributeSystemState
} from "@/feature/thing-attribute-system";

export type SharedState = ActorState & ThingAttributeSystemState;

export const createSharedStore = (doc: Y.Doc) =>
  create<SharedState>(
    yjs(
      doc,
      "shared-state",
      (set) =>
      ({
        ...createActorState(set),
        ...createThingAttributeSystemState(set),
      })
    )
  );

export const createUserName = () =>
{
  const creatures = [
    "basilisk",
    "beholder",
    "dragon",
    "behir",
    "mindflayer",
    "sphynx",
    "troll",
    "goblin",
    "orc",
    "mimic",
    "griffon"
  ];

  const people = [
    "king",
    "queen",
    "baron",
    "lord",
    "knight",
    "adventurer",
    "warrior",
    "thief",
    "cleric",
    "priest",
    "barbarian",
    "wizard",
    "witch",
    "druid",
    "warlock"
  ];

  const things = [
    "sword",
    "shield",
    "goblet",
    "axe",
    "bow",
    "arrow",
    "door",
    "dagger",
    "bucket"
  ];

  const colors = [
    "green",
    "red",
    "blue",
    "yellow",
    "orange",
    "purple",
    "violet",
    "indigo",
    "emerald",
    "sapphire",
    "ruby",
    "copper",
    "gold",
    "silver",
    "bronze",
    "black",
    "white"
  ];

  const miscAdjectives = [
    "cute",
    "adorable",
    "lovable",
    "happy",
    "bubbly",
    "friendly",
    "floating",
    "drifting",
    "flying",
    "violent",
    "screaming",
    "roaring",
    "laughing",
    "rolling",
    "flying",
    "running",
    "skipping",
    "singing",
    "eating",
    "hiding",
    "sneaking",
    "hoarding",
    "crying",
    "sad",
    "depressed",
    "adventurous"
  ];

  const sizeAdjectives = [
    "tiny",
    "small",
    "medium",
    "large",
    "huge",
    "gargantuan",
    "colossal",
    "massive",
    "little",
    "big",
    "giant"
  ];

  const nouns = [ ...creatures, ...people, ...things ];
  const adjectives = [ ...miscAdjectives, ...sizeAdjectives ];

  const size = Math.floor(Math.random() * 10) + 20;

  const pickFrom = <T extends any>(array: T[]) =>
    array[Math.floor(Math.random() * array.length)]

  const capitalize = (word: string) => word[0].toUpperCase() + word.slice(1);

  const noun = capitalize(pickFrom(nouns));
  const adjective = capitalize(pickFrom(adjectives));
  const color = capitalize(pickFrom(colors));

  if ((adjective + color + noun).length <= size)
    return adjective + color + noun;
  else if ((adjective + noun).length <= size)
    return adjective + noun;
  else if ((color + noun))
    return color + noun;
  else
    return noun.slice(0, size);
}