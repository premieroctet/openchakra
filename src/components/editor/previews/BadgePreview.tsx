import React from "react";
import { Badge } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const BadgePreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { props, ref } = useInteractive(component);

  return <Badge ref={ref} {...props} />;
};

export default BadgePreview;
