import React from "react";
import VariantsControl from "../controls/VariantsControl";
import ColorsControl from "../controls/ColorsControl";
import ChildrenControl from "../controls/ChildrenControl";
import { useForm } from "../../../hooks/useForm";

const BadgePanel = () => {
  const { values } = useForm();

  return (
    <>
      <ChildrenControl />

      <VariantsControl name="variant" label="Variant" value={values.variant} />

      <ColorsControl
        label="Variant color"
        name="variantColor"
        value={values.variantColor}
      />
    </>
  );
};

export default BadgePanel;
