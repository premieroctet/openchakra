import React from "react";
import { useForm } from "../../../hooks/useForm";
import ColorsControl from "../controls/ColorsControl";

const AvatarPanel = () => {
  const { values } = useForm();

  return (
    <>
      <ColorsControl
        withFullColor
        label="Color"
        name="bg"
        enableHues
        value={values.bg}
      />

      <ColorsControl
        withFullColor
        label="Border color"
        name="borderColor"
        enableHues
        value={values.borderColor}
      />
    </>
  );
};

export default AvatarPanel;
