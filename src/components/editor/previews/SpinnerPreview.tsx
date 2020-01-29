import React from "react";
import { Spinner } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const SpinnerPreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { props, ref } = useInteractive(component);

  return <Spinner ref={ref} {...props} />;
};

export default SpinnerPreview;
