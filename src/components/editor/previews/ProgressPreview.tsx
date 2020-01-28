import React from "react";
import { Progress, ProgressProps } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const ProgressPreview: React.FC<{ component: IComponent }> = ({
  component
}) => {
  const { props }: { props: ProgressProps } = useInteractive(component);

  return <Progress {...props} />;
};

export default ProgressPreview;
