import React from "react";
import { Image } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const ImagePreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { props, ref } = useInteractive(component);

  return (
    <Image
      ref={ref}
      size="100px"
      objectFit="cover"
      alt="Segun Adebayo"
      fallbackSrc="https://via.placeholder.com/150"
      {...props}
    />
  );
};

export default ImagePreview;
