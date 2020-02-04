import React from "react";
import SwitchControl from "../../controls/SwitchControl";

const AccordionPanel = () => {
  return (
    <>
      <SwitchControl label="Allow multiple" name="allowMultiple" />
      <SwitchControl label="Allow toggle" name="allowToggle" />
    </>
  );
};

export default AccordionPanel;
