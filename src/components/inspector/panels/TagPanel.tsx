import React from "react";
import { useForm } from "../../../hooks/useForm";
import SizeControl from "../controls/SizeControl";
import ChildrenControl from "../controls/ChildrenControl";
import VariantsControl from "../controls/VariantsControl";
import ColorsControl from "../controls/ColorsControl";
import FormControl from "../controls/FormControl";
import { Switch } from "@chakra-ui/core";

const TagPanel = () => {
  const { values, setValue } = useForm();

  return (
    <>
      <ChildrenControl />
      <SizeControl name="size" label="Size" value={values.size} />
      <VariantsControl name="variant" label="Variant" value={values.variant} />
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
