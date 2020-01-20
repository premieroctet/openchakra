import React from "react";
import { Image, ImageProps } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const ImagePreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { props }: { props: ImageProps } = useInteractive(component);

  return (
    <Image
      size="100px"
      objectFit="cover"
      alt="Segun Adebayo"
      fallbackSrc="https://via.placeholder.com/150"
      {...props}
    />
  );
};

export default ImagePreview;
