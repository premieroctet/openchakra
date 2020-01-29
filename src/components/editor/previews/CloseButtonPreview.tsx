import React from "react";
import { CloseButton } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const CloseButtonPreview: React.FC<{ component: IComponent }> = ({
  component
}) => {
  const { props, ref } = useInteractive(component);

  return <CloseButton ref={ref} {...props} />;
};

export default CloseButtonPreview;
