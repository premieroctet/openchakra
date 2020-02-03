import React, { memo } from "react";
import ColorsControl from "../../controls/ColorsControl";
import ChildrenControl from "../../controls/ChildrenControl";
import { useForm } from "../../../../hooks/useForm";
import FormControl from "../../controls/FormControl";
import { Select } from "@chakra-ui/core";
import usePropsSelector from "../../../../hooks/usePropsSelector";

const CheckboxPanel = () => {
  const { setValueFromEvent } = useForm();
  const size = usePropsSelector("size");

  return (
    <>
      <ChildrenControl />

      <ColorsControl label="Variant Color" name="variantColor" />

      <FormControl label="Size" htmlFor="size">
        <Select
          name="size"
          id="size"
          size="sm"
          value={size || "md"}
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

export default memo(CheckboxPanel);
