import React from "react";
import { Button } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const ButtonPreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { props, ref } = useInteractive(component);

  return <Button ref={ref} {...props} />;
};

export default ButtonPreview;
