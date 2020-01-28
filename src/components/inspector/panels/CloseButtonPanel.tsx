import React from "react";
import ColorsControl from "../controls/ColorsControl";
import { Select } from "@chakra-ui/core";
import FormControl from "../controls/FormControl";
import { useForm } from "../../../hooks/useForm";

const CloseButtonPanel = () => {
  const { values, setValueFromEvent } = useForm();

  return (
    <>
      <FormControl label="Size" htmlFor="size">
        <Select
          name="size"
          id="size"
          size="sm"
          value={values.size || ""}
          onChange={setValueFromEvent}
        >
          <option>sm</option>
          <option>md</option>
          <option>lg</option>
        </Select>
      </FormControl>

      <ColorsControl
        label="Color"
        name="color"
        value={values.color}
        enableHues
      />
    </>
  );
};

export default CloseButtonPanel;
