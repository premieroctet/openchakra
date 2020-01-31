import React from "react";
import { useInteractive } from "../../../hooks/useInteractive";
import { useDropComponent } from "../../../hooks/useDropComponent";
import ComponentPreview from "../ComponentPreview";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box
} from "@chakra-ui/core";

const AlertPreview: React.FC<IPreviewProps> = ({ component }) => {
  const acceptedTypes = [
    "AlertIcon",
    "AlertTitle",
    "AlertDescription"
  ] as ComponentType[];
  const { props, ref } = useInteractive(component, false);
  const { drop, isOver } = useDropComponent(component.id, acceptedTypes);

  let boxProps: any = {};

  if (isOver) {
    props.bg = "teal.50";
  }

  return (
    <Box ref={drop(ref)} {...boxProps}>
      <Alert {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview componentName={key} />
        ))}
      </Alert>
    </Box>
  );
};

export const AlertIconPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component);
  return <AlertIcon ref={ref} {...props} />;
};

export const AlertTitlePreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component);
  return (
    <AlertTitle ref={ref} {...props}>
      {props.children || "Lorem Ipsum"}
    </AlertTitle>
  );
};

export const AlertDescriptionPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component);
  return <AlertDescription ref={ref} {...props} />;
};

export default AlertPreview;
