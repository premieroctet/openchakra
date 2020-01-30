import React from "react";
import { Box, Text, Stack } from "@chakra-ui/core";
import { useDropComponent } from "../../../hooks/useDropComponent";

import { useInteractive } from "../../../hooks/useInteractive";

const StackPreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { props, ref } = useInteractive(component);
  const acceptedTypes = ["Flex"] as ComponentType[];
  let boxProps: any = {};
  const { drop, isOver } = useDropComponent(component.name, acceptedTypes);
  if (isOver) {
    props.bg = "teal.50";
  }
  return (
    <Box ref={drop(ref)} {...boxProps}>
      <Stack {...props}>
        <Text>{props.children || "Lorem Ipsum"}</Text>
      </Stack>
    </Box>
  );
};

export default StackPreview;
