import React from "react";
import { useInteractive } from "../../../hooks/useInteractive";
import { useDropComponent } from "../../../hooks/useDropComponent";
import { Tabs, TabList, TabPanel, TabPanels, Tab } from "@chakra-ui/core";
import ComponentPreview from "../ComponentPreview";

const acceptedTypes = [
  "TabList",
  "TabPanel",
  "TabPanels",
  "Tab",
  "Text"
] as ComponentType[];

const TabsPreview: React.FC<IPreviewProps> = ({ component }) => {
  const { props, ref } = useInteractive(component, true);
  const { drop, isOver } = useDropComponent(component.id, acceptedTypes);

  if (isOver) {
    props.bg = "teal.50";
  }

  return (
    <Tabs ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview componentName={key} />
      ))}
    </Tabs>
  );
};

export const TabListPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true);
  const { drop, isOver } = useDropComponent(component.id, acceptedTypes);

  if (isOver) {
    props.bg = "teal.50";
  }

  return (
    <TabList ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview componentName={key} />
      ))}
    </TabList>
  );
};

export const TabPanelPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component);
  return <TabPanel ref={ref} {...props} />;
};

export const TabPanelsPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true);
  const { drop, isOver } = useDropComponent(component.id, acceptedTypes);

  if (isOver) {
    props.bg = "teal.50";
  }

  return (
    <TabPanels ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview componentName={key} />
      ))}
    </TabPanels>
  );
};

export const TabPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component);
  return <Tab ref={ref} {...props} />;
};
export default TabsPreview;
