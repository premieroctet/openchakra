import React from "react";
import { useForm } from "../../../hooks/useForm";
import SizeControl from "../controls/SizeControl";
import ChildrenControl from "../controls/ChildrenControl";

const AlertTitlePanel = () => {
  const { values } = useForm();
  return (
    <>
      <ChildrenControl />
      <SizeControl name="fontSize" label="fontSize" value={values.fontSize} />
    </>
  );
};

export default AlertTitlePanel;
