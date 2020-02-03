import React from "react";
import { Select } from "@chakra-ui/core";
import { useForm } from "../../../../hooks/useForm";
import SizeControl from "../../controls/SizeControl";
import ChildrenControl from "../../controls/ChildrenControl";
import ColorsControl from "../../controls/ColorsControl";
import FormControl from "../../controls/FormControl";
import usePropsSelector from "../../../../hooks/usePropsSelector";
import SwitchControl from "../../controls/SwitchControl";

const TagPanel = () => {
  const { setValueFromEvent } = useForm();

  const size = usePropsSelector("size");
  const variant = usePropsSelector("variant");
  const rounded = usePropsSelector("rounded");

  return (
    <>
      <ChildrenControl />
      <SizeControl
        options={["sm", "md", "lg"]}
        name="size"
        label="Size"
        value={size}
      />
      <FormControl htmlFor="variant" label="Variant">
        <Select
          id="variant"
          onChange={setValueFromEvent}
          name="variant"
          size="sm"
          value={variant || ""}
        >
          <option>solid</option>
          <option>outline</option>
          <option>subtle</option>
        </Select>
      </FormControl>

      <ColorsControl label="Variant Color" name="variantColor" />

      <SizeControl name="rounded" label="Border radius" value={rounded} />

      <SwitchControl label="Inline" name="isInline" />
    </>
  );
};

export default TagPanel;
