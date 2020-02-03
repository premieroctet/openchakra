import React, { memo } from "react";
import { Input, Select } from "@chakra-ui/core";
import FormControl from "../../controls/FormControl";
import { useForm } from "../../../../hooks/useForm";
import SizeControl, { Size } from "../../controls/SizeControl";
import usePropsSelector from "../../../../hooks/usePropsSelector";

const options = ["sm", "md", "lg"] as Size[];

const TextareaPanel = () => {
  const { setValueFromEvent } = useForm();

  const placeholder = usePropsSelector("placeholder");
  const size = usePropsSelector("size");
  const resize = usePropsSelector("resize");

  return (
    <>
      <FormControl label="Placeholder">
        <Input
          size="sm"
          value={placeholder || ""}
          type="text"
          name="placeholder"
          onChange={setValueFromEvent}
        />
      </FormControl>
      <SizeControl options={options} name="size" label="Size" value={size} />
      <FormControl label="Resize" htmlFor="resize">
        <Select
          name="resize"
          id="size"
          size="sm"
          value={resize || ""}
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

export default memo(TextareaPanel);
