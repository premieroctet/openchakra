import React from "react";
import { Flex } from "@chakra-ui/core";
import { useDropComponent } from "../../../hooks/useDropComponent";

import { useInteractive } from "../../../hooks/useInteractive";
import ComponentPreview from "../ComponentPreview";

const FlexPreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { drop, isOver } = useDropComponent(component.id);
  const { props, ref } = useInteractive(component, true);

  if (isOver) {
    props.bg = "teal.50";
  }

  return (
    <Flex pos="relative" ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview componentName={key} />
      ))}
    </Flex>
  );
};

export default FlexPreview;
