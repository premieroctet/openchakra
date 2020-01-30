import React from "react";
import { Switch } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const SwitchPreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { props, ref } = useInteractive(component);

  return <Switch ref={ref} {...props} />;
};

export default SwitchPreview;
