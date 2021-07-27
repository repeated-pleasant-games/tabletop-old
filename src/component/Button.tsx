import React from "react";

import styles from "./Button.module.css";

export const Button = ({ children, onClick }: React.HTMLAttributes<{}>) =>
(
  <button className={styles.button} onClick={onClick}>{children}</button>
);