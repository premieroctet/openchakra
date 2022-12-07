import React from "react";

const Card = ({ children, ...props }: { children: React.ReactNode }) => (
  <div {...props}>{children}</div>
);

export default Card;
