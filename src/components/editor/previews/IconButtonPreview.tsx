import React from "react";
import { IconButton } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const IconButtonPreview: React.FC<{ component: IComponent }> = ({
  component
}) => {
  const { props, ref } = useInteractive(component);

  return <IconButton ref={ref} {...props} />;
};

export default IconButtonPreview;
