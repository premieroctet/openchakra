import React from "react";
import { Icon } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const IconPreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { props, ref } = useInteractive(component);

  return <Icon ref={ref} name="copy" {...props} />;
};

export default IconPreview;
