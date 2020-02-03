import React from "react";
import SwitchControl from "../../controls/SwitchControl";

const FormControlPanel = () => {
  return (
    <>
      <SwitchControl label="Invalid" name="isInvalid" />
      <SwitchControl label="Required" name="isRequired" />
      <SwitchControl label="ReadOnly" name="isReadOnly" />
    </>
  );
};

export default FormControlPanel;
