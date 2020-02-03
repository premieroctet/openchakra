import React from "react";
import { SimpleGrid } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";
import { useDropComponent } from "../../../hooks/useDropComponent";
import ComponentPreview from "../ComponentPreview";

const SimpleGridPreview: React.FC<{ component: IComponent }> = ({
  component
}) => {
  const { drop, isOver } = useDropComponent(component.id);
  const { props, ref } = useInteractive(component, true);

  if (isOver) {
    props.bg = "teal.50";
  }

  return (
    <SimpleGrid pos="relative" ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview componentName={key} />
      ))}
    </SimpleGrid>
  );
};

export default SimpleGridPreview;
