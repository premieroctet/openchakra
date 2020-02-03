import React from "react";
import { Heading } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const HeadingPreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { props, ref } = useInteractive(component);
  return <Heading ref={ref} {...props} />;
};

export default HeadingPreview;
