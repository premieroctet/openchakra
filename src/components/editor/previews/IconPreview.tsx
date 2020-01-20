import React from "react";
import { Icon, IconProps } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const IconPreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { props }: { props: IconProps } = useInteractive(component);

  return <Icon name="copy" {...props} />;
};

export default IconPreview;
