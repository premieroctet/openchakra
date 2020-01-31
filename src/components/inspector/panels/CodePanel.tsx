import React from "react";
import ColorsControl from "../controls/ColorsControl";
import { useForm } from "../../../hooks/useForm";
import ChildrenControl from "../controls/ChildrenControl";

const CodePanel = () => {
  const { values } = useForm();

  return (
    <>
      <ChildrenControl />
      <ColorsControl
        label="Variant Color"
        name="variantColor"
        value={values.variantColor}
      />
    </>
  );
};

export default CodePanel;
