import React from "react";
import { Checkbox, CheckboxProps } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const CheckboxPreview: React.FC<{ component: IComponent }> = ({
  component
}) => {
  const { props }: { props: CheckboxProps } = useInteractive(component);

  return <Checkbox {...props}>{props.children || "Lorem Ipsum"}</Checkbox>;
};

export default CheckboxPreview;
