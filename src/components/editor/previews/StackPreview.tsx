import React from "react";
import { Stack, Box } from "@chakra-ui/core";
import { useDropComponent } from "../../../hooks/useDropComponent";
import { useInteractive } from "../../../hooks/useInteractive";
import ComponentPreview from "../ComponentPreview";

const StackPreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { drop, isOver } = useDropComponent(component.id);
  const { props, ref } = useInteractive(component, true);

  let boxProps: any = {};

  if (isOver) {
    props.bg = "teal.50";
  }

  return (
    <Box {...boxProps} ref={drop(ref)}>
      <Stack {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview componentName={key} />
        ))}
      </Stack>
    </Box>
  );
};

export default StackPreview;
