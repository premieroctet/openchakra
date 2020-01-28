import React from "react";
import { CloseButton, CloseButtonProps } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const CloseButtonPreview: React.FC<{ component: IComponent }> = ({
  component
}) => {
  const { props }: { props: CloseButtonProps } = useInteractive(component);

  return <CloseButton {...props} />;
};

export default CloseButtonPreview;
