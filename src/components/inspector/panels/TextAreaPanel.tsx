import React from "react";
import { Input, Select } from "@chakra-ui/core";
import FormControl from "../controls/FormControl";
import { useForm } from "../../../hooks/useForm";
import SizeControl from "../controls/SizeControl";

const TextAreaPanel = () => {
  const { values, setValueFromEvent } = useForm();

  return (
    <>
      <FormControl label="Valeur">
        <Input
          size="sm"
          value={values.value || ""}
          type="text"
          name="value"
          onChange={setValueFromEvent}
        />
      </FormControl>
      <FormControl label="Placeholder">
        <Input
          size="sm"
          value={values.placeholder || ""}
          type="text"
          name="placeholder"
          onChange={setValueFromEvent}
        />
      </FormControl>
      <SizeControl name="size" label="Size" value={values.size} />
      <FormControl label="Resize" htmlFor="resize">
        <Select
          name="resize"
          id="size"
          size="sm"
          value={values.resize || ""}
          onChange={setValueFromEvent}
        >
          <option>horizontal</option>
          <option>vertical</option>
          <option>none</option>
        </Select>
      </FormControl>
    </>
  );
};

export default TextAreaPanel;
