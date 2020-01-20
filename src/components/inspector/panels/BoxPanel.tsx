import React from "react";
import ColorsControl from "../controls/ColorsControl";
import { useForm } from "../../../hooks/useForm";

const BoxPanel = () => {
  const { values } = useForm();

  return (
    <ColorsControl
      withFullColor
      label="Color"
      name="bg"
      enableHues
      value={values.bg}
    />
  );
};

export default BoxPanel;
