import React, { memo } from "react";
import { Select, Switch } from "@chakra-ui/core";
import ColorsControl from "../../controls/ColorsControl";
import FormControl from "../../controls/FormControl";
import { useForm } from "../../../../hooks/useForm";
import usePropsSelector from "../../../../hooks/usePropsSelector";

const SwitchPanel = () => {
  const { setValueFromEvent, setValue } = useForm();

  const isChecked = usePropsSelector("isChecked");
  const size = usePropsSelector("size");

  return (
    <>
      <FormControl label="Checked" htmlFor="isChecked">
        <Switch
          name="isChecked"
          id="isChecked"
          size="sm"
          isChecked={isChecked || false}
          onChange={() => setValue("isChecked", !isChecked)}
        />
      </FormControl>

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
