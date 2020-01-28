import React from "react";
import { Select } from "@chakra-ui/core";
import FormControl from "../controls/FormControl";
import { useForm } from "../../../hooks/useForm";

const DividerPanel = () => {
  const { values, setValueFromEvent } = useForm();

  return (
    <FormControl label="Orientation" htmlFor="orientation">
      <Select
        name="orientation"
        id="orientation"
        size="sm"
        value={values.orientation || "md"}
        onChange={setValueFromEvent}
      >
        <option>horizontal</option>
        <option>vertical</option>
        <option>lg</option>
      </Select>
    </FormControl>
  );
};

export default DividerPanel;
