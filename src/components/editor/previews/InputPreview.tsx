import React from "react";
import { Input } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const InputPreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { props, ref } = useInteractive(component);
  return <Input ref={ref} {...props} />;
};

export default InputPreview;
