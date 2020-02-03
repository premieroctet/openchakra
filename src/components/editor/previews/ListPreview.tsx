import React from "react";
import { ListItem, ListIcon, List } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";
import ComponentPreview from "../ComponentPreview";
import { useDropComponent } from "../../../hooks/useDropComponent";

const listAcceptedTypes = ["ListItem", "ListIcon"] as ComponentType[];

export const ListPreview: React.FC<{ component: IComponent }> = ({
  component
}) => {
  const { drop, isOver } = useDropComponent(component.id, listAcceptedTypes);
  const { props, ref } = useInteractive(component, true);

  if (isOver) {
    props.bg = "teal.50";
  }

  return (
    <List pos="relative" ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview componentName={key} />
      ))}
    </List>
  );
};

export const ListItemPreview: React.FC<{ component: IComponent }> = ({
  component
}) => {
  const { props, ref } = useInteractive(component, true);

  return <ListItem ref={ref} {...props} />;
};

export const ListIconPreview: React.FC<{ component: IComponent }> = ({
  component
}) => {
  const { props, ref } = useInteractive(component, true);

  return <ListIcon ref={ref} {...props} />;
};
