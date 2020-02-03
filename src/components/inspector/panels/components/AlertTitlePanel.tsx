import React, { memo } from "react";
import SizeControl from "../../controls/SizeControl";
import ChildrenControl from "../../controls/ChildrenControl";
import usePropsSelector from "../../../../hooks/usePropsSelector";

const AlertTitlePanel = () => {
  const fontSize = usePropsSelector("fontSize");

  return (
    <>
      <ChildrenControl />
      <SizeControl name="fontSize" label="fontSize" value={fontSize} />
    </>
  );
};

export default memo(AlertTitlePanel);
