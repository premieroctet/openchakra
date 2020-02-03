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
import ComponentPreview from "../ComponentPreview";

const acceptedTypes = [
  "AccordionItem",
  "AccordionHeader",
  "AccordionPanel",
  "AccordionIcon"
] as ComponentType[];

const AccordionPreview: React.FC<IPreviewProps> = ({ component }) => {
  const { props, ref } = useInteractive(component, true);
  const { drop, isOver } = useDropComponent(component.id, acceptedTypes);

  let boxProps: any = {};

  if (isOver) {
    props.bg = "teal.50";
  }

  return (
    <Box ref={drop(ref)} {...boxProps}>
      <Accordion {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview componentName={key} />
        ))}
      </Accordion>
    </Box>
  );
};

export const AccordionItemPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true);
  const { drop, isOver } = useDropComponent(component.id, acceptedTypes);

  if (isOver) {
    props.bg = "teal.50";
  }

  return (
    <AccordionItem ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview componentName={key} />
      ))}
    </AccordionItem>
  );
};

export const AccordionHeaderPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true);
  const { drop, isOver } = useDropComponent(component.id, acceptedTypes);

  if (isOver) {
    props.bg = "teal.50";
  }

  return (
    <AccordionHeader ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview componentName={key} />
      ))}
    </AccordionHeader>
  );
};

export const AccordionPanelPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true);
  const { drop, isOver } = useDropComponent(component.id);

  if (isOver) {
    props.bg = "teal.50";
  }

  return (
    <AccordionPanel ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview componentName={key} />
      ))}
    </AccordionPanel>
  );
};

export const AccordionIconPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component);
  return <AccordionIcon ref={ref} {...props} />;
};

export default AccordionPreview;
