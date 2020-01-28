import React from "react";
import { Spinner, SpinnerProps } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const SpinnerPreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { props }: { props: SpinnerProps } = useInteractive(component);

  return <Spinner {...props} />;
};

export default SpinnerPreview;
