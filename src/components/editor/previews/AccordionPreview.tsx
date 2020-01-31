import React from "react";
import { useInteractive } from "../../../hooks/useInteractive";
import { useDropComponent } from "../../../hooks/useDropComponent";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon
} from "@chakra-ui/core";

const AccordionPreview: React.FC<IPreviewProps> = ({ component }) => {
  const acceptedTypes = [
    "AccordionItem",
    "AccordionHeader",
    "AccordionPanel",
    "AccordionIcon"
  ] as ComponentType[];
  const { props, ref } = useInteractive(component, false);
  const { drop, isOver } = useDropComponent(component.name, acceptedTypes);

  let boxProps: any = {};

  if (isOver) {
    props.bg = "teal.50";
  }

  return (
    <Box ref={drop(ref)} {...boxProps}>
      <Accordion ref={ref} {...props} />
    </Box>
  );
};

export const AccordionItemPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component);
  return <AccordionItem ref={ref} {...props} />;
};

export const AccordionHeaderPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component);
  return <AccordionHeader ref={ref} {...props} />;
};

export const AccordionPanelPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component);
  return (
    <AccordionPanel ref={ref} {...props}>
      {props.children || "Lorem Ipsum"}
    </AccordionPanel>
  );
};

export const AccordionIconPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component);
  return <AccordionIcon ref={ref} {...props} />;
};

export default AccordionPreview;
