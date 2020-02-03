import React from "react";
import { Image } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const ImagePreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { props, ref } = useInteractive(component);

  return <Image ref={ref} {...props} />;
};

export default ImagePreview;
