import React, { memo } from "react";
import ColorsControl from "../../controls/ColorsControl";
import ChildrenControl from "../../controls/ChildrenControl";

const CodePanel = () => {
  return (
    <>
      <ChildrenControl />
      <ColorsControl label="Variant Color" name="variantColor" />
    </>
  );
};

export default memo(CodePanel);
