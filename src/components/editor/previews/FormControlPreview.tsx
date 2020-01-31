import React from "react";
import { useInteractive } from "../../../hooks/useInteractive";
import { useDropComponent } from "../../../hooks/useDropComponent";
import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Text
} from "@chakra-ui/core";

const FormControlPreview: React.FC<IPreviewProps> = ({ component }) => {
  const acceptedTypes = [
    "FormLabel",
    "FormHelperText",
    "FormErrorMessage",
    "Input",
    "Select",
    "Text",
    "Image"
  ] as ComponentType[];
  const { props, ref } = useInteractive(component, false);
  let boxProps: any = {};
  const { drop, isOver } = useDropComponent(component.name, acceptedTypes);
  if (isOver) {
    props.bg = "teal.50";
  }

  return (
    <Box ref={drop(ref)} {...boxProps}>
      <FormControl {...props}>
        <Text>{props.children || "Lorem Ipsum"}</Text>
      </FormControl>
    </Box>
  );
};

export const FormLabelPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component);
  return <FormLabel ref={ref} {...props} />;
};

export const FormHelperTextPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component);
  return (
    <FormHelperText ref={ref} {...props}>
      <Text>{props.children || "Lorem Ipsum"}</Text>
    </FormHelperText>
  );
};

export const FormErrorMessagePreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component);
  return (
    <FormErrorMessage ref={ref} {...props}>
      {props.children || "Lorem Ipsum"}
    </FormErrorMessage>
  );
};

export default FormControlPreview;
