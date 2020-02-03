import React, { memo } from "react";
import { Select } from "@chakra-ui/core";
import ColorsControl from "../../controls/ColorsControl";
import FormControl from "../../controls/FormControl";
import { useForm } from "../../../../hooks/useForm";
import usePropsSelector from "../../../../hooks/usePropsSelector";
import SwitchControl from "../../controls/SwitchControl";

const SwitchPanel = () => {
  const { setValueFromEvent } = useForm();
  const size = usePropsSelector("size");

  return (
    <>
      <SwitchControl label="Checked" name="isChecked" />

      <FormControl label="Size" htmlFor="size">
        <Select
          name="size"
          id="size"
          size="sm"
          value={size || ""}
          onChange={setValueFromEvent}
        >
          <option>sm</option>
          <option>md</option>
          <option>lg</option>
        </Select>
      </FormControl>

      <ColorsControl label="Color" name="color" />
    </>
  );
};

export default memo(SwitchPanel);
