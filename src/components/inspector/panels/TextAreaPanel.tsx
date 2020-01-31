import React from "react";
import { Input, Select } from "@chakra-ui/core";
import FormControl from "../controls/FormControl";
import { useForm } from "../../../hooks/useForm";
import SizeControl, { Size } from "../controls/SizeControl";

const options = ["sm", "md", "lg"] as Size[];

const TextareaPanel = () => {
  const { values, setValueFromEvent } = useForm();

  return (
    <>
      <FormControl label="Placeholder">
        <Input
          size="sm"
          value={values.placeholder || ""}
          type="text"
          name="placeholder"
          onChange={setValueFromEvent}
        />
      </FormControl>
      <SizeControl
        options={options}
        name="size"
        label="Size"
        value={values.size}
      />
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

export default TextareaPanel;
