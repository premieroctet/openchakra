import React from "react";
import { Text } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const TextPreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { props, ref } = useInteractive(component);

  return <Text ref={ref} {...props} />;
};

export default TextPreview;
