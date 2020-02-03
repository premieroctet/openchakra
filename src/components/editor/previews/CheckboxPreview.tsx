import React from "react";
import { Checkbox } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const CheckboxPreview: React.FC<{ component: IComponent }> = ({
  component
}) => {
  const { props, ref } = useInteractive(component);

  return <Checkbox ref={ref} {...props} />;
};

export default CheckboxPreview;
