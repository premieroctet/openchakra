import React from "react";
import { useForm } from "../../../hooks/useForm";
import SizeControl from "../controls/SizeControl";
import ChildrenControl from "../controls/ChildrenControl";
import ColorsControl from "../controls/ColorsControl";
import FormControl from "../controls/FormControl";
import { Switch, Select } from "@chakra-ui/core";

const TagPanel = () => {
  const { values, setValue, setValueFromEvent } = useForm();

  return (
    <>
      <ChildrenControl />
      <SizeControl name="size" label="Size" value={values.size} />
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
        label="Variant Color"
        name="variantColor"
        value={values.variantColor}
      />

      <SizeControl
        name="rounded"
        label="Border radius"
        value={values.rounded}
      />

      <FormControl label="Is Inline" htmlFor="isInline">
        <Switch
          name="isInline"
          id="isInline"
          size="sm"
          isChecked={values.isInline || false}
          onChange={() => setValue("isInline", !values.isInline)}
        />
      </FormControl>
    </>
  );
};

export default TagPanel;
