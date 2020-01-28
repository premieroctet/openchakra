import React from "react";
import { IconButton, IconButtonProps } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const IconButtonPreview: React.FC<{ component: IComponent }> = ({
  component
}) => {
  const { props }: { props: IconButtonProps } = useInteractive(component);

  return <IconButton {...props} />;
};

export default IconButtonPreview;
