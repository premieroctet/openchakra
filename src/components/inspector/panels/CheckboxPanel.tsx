import React from "react";
import ColorsControl from "../controls/ColorsControl";
import ChildrenControl from "../controls/ChildrenControl";
import { useForm } from "../../../hooks/useForm";
import FormControl from "../controls/FormControl";
import { Select } from "@chakra-ui/core";

const CheckboxPanel = () => {
  const { values, setValueFromEvent } = useForm();

  return (
    <>
      <ChildrenControl />

      <ColorsControl
        label="Variant Color"
        name="variantColor"
        value={values.variantColor}
      />

      <FormControl label="Size" htmlFor="size">
        <Select
          name="size"
          id="size"
          size="sm"
          value={values.size || "md"}
          onChange={setValueFromEvent}
        >
          <option>sm</option>
          <option>md</option>
          <option>lg</option>
        </Select>
      </FormControl>
    </>
  );
};

export default CheckboxPanel;
