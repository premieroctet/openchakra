import React from "react";
import { Text, BoxProps } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const TextPreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { props }: { props: BoxProps } = useInteractive(component);

  return <Text {...props}>{component.props.children || "Lorem Ipsum"}</Text>;
};

export default TextPreview;
