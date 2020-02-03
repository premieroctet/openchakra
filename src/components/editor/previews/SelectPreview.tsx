import React from "react";
import { Select } from "@chakra-ui/core";
import { useInteractive } from "../../../hooks/useInteractive";

const SelectPreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { props, ref } = useInteractive(component);

  return (
    <Select ref={ref} {...props}>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  );
};

export default SelectPreview;
