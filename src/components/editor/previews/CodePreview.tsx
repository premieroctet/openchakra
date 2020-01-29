import React from "react";
import { Code } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const CodePreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { props }: { props: any } = useInteractive(component);
  return <Code {...props}>{props.children || "Lorem Ipsum"}</Code>;
};

export default CodePreview;
