import React from "react";
import { useInteractive } from "../../../hooks/useInteractive";
import { useDropComponent } from "../../../hooks/useDropComponent";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage
} from "@chakra-ui/core";
import ComponentPreview from "../ComponentPreview";

const acceptedTypes = [
  "FormLabel",
  "FormHelperText",
  "FormErrorMessage",
  "Input",
  "Select",
  "Text",
  "Image"
] as ComponentType[];

const FormControlPreview: React.FC<IPreviewProps> = ({ component }) => {
  const { props, ref } = useInteractive(component, true);
  const { drop, isOver } = useDropComponent(component.id, acceptedTypes);

  if (isOver) {
    props.bg = "teal.50";
  }

  return (
    <FormControl ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview componentName={key} />
      ))}
    </FormControl>
  );
};

export const FormLabelPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component);
  return <FormLabel ref={ref} {...props} />;
};

export const FormHelperTextPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component);
  return <FormHelperText ref={ref} {...props} />;
};

export const FormErrorMessagePreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component);
  return <FormErrorMessage ref={ref} {...props} />;
};

export default FormControlPreview;
