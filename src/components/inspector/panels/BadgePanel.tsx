import React from "react";
import ColorsControl from "../controls/ColorsControl";
import ChildrenControl from "../controls/ChildrenControl";
import { useForm } from "../../../hooks/useForm";
import { Select } from "@chakra-ui/core";
import FormControl from "../controls/FormControl";

const BadgePanel = () => {
  const { values, setValueFromEvent } = useForm();

  return (
    <>
      <ChildrenControl />

      <FormControl htmlFor="variant" label="Variant">
        <Select
          id="variant"
          onChange={setValueFromEvent}
          name="variant"
          size="sm"
          value={values.variant || ""}
        >
          <option>solid</option>
          <option>outline</option>
          <option>subtle</option>
        </Select>
      </FormControl>

      <ColorsControl
        label="Variant color"
        name="variantColor"
        value={values.variantColor}
      />
    </>
  );
};

export default BadgePanel;
