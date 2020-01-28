import React from "react";
import { Divider } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const DividerPreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { props, ref } = useInteractive(component);
  return <Divider ref={ref} {...props} />;
};

export default DividerPreview;
