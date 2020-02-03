import React from "react";
import { Input } from "@chakra-ui/core";
import FormControl from "./FormControl";
import { useForm } from "../../../hooks/useForm";
import usePropsSelector from "../../../hooks/usePropsSelector";

const ChildrenControl: React.FC = () => {
  const { setValueFromEvent } = useForm();
  const children = usePropsSelector("children");

  return (
    <FormControl htmlFor="children" label="Text">
      <Input
        id="children"
        name="children"
        autoFocus
        size="sm"
        value={children || ""}
        type="text"
        onChange={setValueFromEvent}
      />
    </FormControl>
  );
};

export default ChildrenControl;
