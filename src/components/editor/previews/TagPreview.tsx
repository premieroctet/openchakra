import React from "react";
import { Tag } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const TagPreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { props, ref } = useInteractive(component);
  return <Tag ref={ref} {...props} />;
};

export default TagPreview;
