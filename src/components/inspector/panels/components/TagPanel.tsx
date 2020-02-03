import React from "react";
import { Switch, Select } from "@chakra-ui/core";
import { useForm } from "../../../../hooks/useForm";
import SizeControl from "../../controls/SizeControl";
import ChildrenControl from "../../controls/ChildrenControl";
import ColorsControl from "../../controls/ColorsControl";
import FormControl from "../../controls/FormControl";
import usePropsSelector from "../../../../hooks/usePropsSelector";

const TagPanel = () => {
  const { setValue, setValueFromEvent } = useForm();

  const size = usePropsSelector("size");
  const variant = usePropsSelector("variant");
  const rounded = usePropsSelector("rounded");
  const isInline = usePropsSelector("isInline");

  return (
    <>
      <ChildrenControl />
      <SizeControl name="size" label="Size" value={size} />
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

      <FormControl label="Is Inline" htmlFor="isInline">
        <Switch
          name="isInline"
          id="isInline"
          size="sm"
          isChecked={isInline || false}
          onChange={() => setValue("isInline", !isInline)}
        />
      </FormControl>
    </>
  );
};

export default TagPanel;
