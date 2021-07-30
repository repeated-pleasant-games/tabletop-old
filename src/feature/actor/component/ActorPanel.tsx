import React from "react";

import { v4 as uuid } from "uuid";

import { useSharedStore } from "@/hook/useSharedStore";
import { Button } from "@/component/Button";

import "./ActorPanel.module.css";
import styles from "./ActorPanel.module.css";

export const ActorPanel = (): any =>
{
  const { actors, addActor, removeActor } = useSharedStore();

  return (
    <>
      <Button
        onClick={() =>
          addActor({
            id: uuid(),
            name: "Actor",
            initiative: 0,
            x: 0,
            y: 0,
          })
        }
      >
        Add Actor
      </Button>
      {
        (!actors || actors.length === 0)
        ? (
          <p className={styles["no-actors"]}>... No actors ...</p>
        )
        : (
          <div className={styles["list-container"]}>
            <ul>
              {
                actors.map((actor) =>
                  (
                    <li
                      key={actor.id}
                      onClick={() => removeActor(actor.id)}
                    >
                      {actor.name}
                    </li>
                  )
                )
              }
            </ul>
          </div>
        )
      }
    </>
  );
};

export default ActorPanel;