import React from "react";
import { Button, ButtonProps } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const ButtonPreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { props }: { props: ButtonProps } = useInteractive(component);

  return <Button {...props}>{props.children || "Lorem Ipsum"}</Button>;
};

export default ButtonPreview;
