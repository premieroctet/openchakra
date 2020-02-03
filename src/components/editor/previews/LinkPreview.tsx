import React from "react";
import { Link } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const LinkPreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { props, ref } = useInteractive(component);

  return <Link ref={ref} {...props} />;
};

export default LinkPreview;
