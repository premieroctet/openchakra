import React from "react";
import { Progress } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const ProgressPreview: React.FC<{ component: IComponent }> = ({
  component
}) => {
  const { props, ref } = useInteractive(component);

  return <Progress ref={ref} {...props} />;
};

export default ProgressPreview;
