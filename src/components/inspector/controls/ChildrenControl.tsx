import React from "react";
import { Input } from "@chakra-ui/core";
import FormControl from "./FormControl";
import { useForm } from "../../../hooks/useForm";

const ChildrenControl: React.FC = () => {
  const { setValueFromEvent, values } = useForm();

  return (
    <FormControl htmlFor="children" label="Text">
      <Input
        id="children"
        name="children"
        autoFocus
        size="sm"
        value={values.children || ""}
        type="text"
        onChange={setValueFromEvent}
      />
    </FormControl>
  );
};

export default ChildrenControl;
