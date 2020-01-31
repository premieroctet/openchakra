import React from "react";
import { useInteractive } from "../../../hooks/useInteractive";
import { useDropComponent } from "../../../hooks/useDropComponent";
import {
  Box,
  Text,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Tab
} from "@chakra-ui/core";

const TabsPreview: React.FC<IPreviewProps> = ({ component }) => {
  const acceptedTypes = [
    "TabList",
    "TabPanel",
    "TabPanels",
    "Tab",
    "Text"
  ] as ComponentType[];
  const { props, ref } = useInteractive(component, false);
  let boxProps: any = {
    display: "inline-block"
  };
  const { drop, isOver } = useDropComponent(component.name, acceptedTypes);
  if (isOver) {
    props.bg = "teal.50";
  }

  return (
    <Box ref={drop(ref)} {...boxProps}>
      <Tabs {...props}>
        <Text>{props.children || "Tabs"}</Text>
      </Tabs>
    </Box>
  );
};

export const TabListPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component);
  return <TabList ref={ref} {...props} />;
};

export const TabPanelPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component);
  return (
    <TabPanel ref={ref} {...props}>
      <Text>{props.children || "Lorem Ipsum"}</Text>
    </TabPanel>
  );
};

export const TabPanelsPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component);
  return (
    <TabPanels ref={ref} {...props}>
      {props.children || "Lorem Ipsum"}
    </TabPanels>
  );
};

export const TabPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component);
  return (
    <Tab ref={ref} {...props}>
      {props.children || "Lorem Ipsum"}
    </Tab>
  );
};
export default TabsPreview;
