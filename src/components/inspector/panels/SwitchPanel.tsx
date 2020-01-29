import React from "react";
import ColorsControl from "../controls/ColorsControl";
import { Select, Switch } from "@chakra-ui/core";
import FormControl from "../controls/FormControl";
import { useForm } from "../../../hooks/useForm";

const SwitchPanel = () => {
  const { values, setValueFromEvent, setValue } = useForm();

  return (
    <>
      <FormControl label="Checked" htmlFor="isChecked">
        <Switch
          name="isChecked"
          id="isChecked"
          size="sm"
          isChecked={values.isChecked || false}
          onChange={() => setValue("isChecked", !values.isChecked)}
        />
      </FormControl>

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

      <ColorsControl label="Color" name="color" value={values.color} />
    </>
  );
};

export default SwitchPanel;
