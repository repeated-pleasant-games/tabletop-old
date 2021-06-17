import React from "react";

export const Button = ({ children, onClick }: React.HTMLAttributes<{}>) =>
(
  <button onClick={onClick}>{children}</button>
);