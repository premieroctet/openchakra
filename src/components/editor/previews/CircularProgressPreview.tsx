import React from "react";
import { CircularProgress } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const CircularProgressPreview: React.FC<{ component: IComponent }> = ({
  component
}) => {
  const { props, ref } = useInteractive(component);
  return <CircularProgress ref={ref} {...props} />;
};

export default CircularProgressPreview;
