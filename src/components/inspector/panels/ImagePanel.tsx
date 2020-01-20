import React from "react";
import { Input } from "@chakra-ui/core";
import FormControl from "../controls/FormControl";
import { useForm } from "../../../hooks/useForm";

const ImagePanel = () => {
  const { setValueFromEvent, values } = useForm();

  return (
    <FormControl label="Source" htmlFor="src">
      <Input
        width="10rem"
        placeholder="Image URL"
        value={values.src || ""}
        size="sm"
        type="text"
        name="src"
        onChange={setValueFromEvent}
      />
    </FormControl>
  );
};

export default ImagePanel;
