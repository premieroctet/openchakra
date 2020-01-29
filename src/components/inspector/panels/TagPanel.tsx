import React from "react";
import { useForm } from "../../../hooks/useForm";
import SizeControl from "../controls/SizeControl";
import ChildrenControl from "../controls/ChildrenControl";
import VariantsControl from "../controls/VariantsControl";
import ColorsControl from "../controls/ColorsControl";

const TagPanel = () => {
  const { values } = useForm();

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
    </>
  );
};

export default TagPanel;
