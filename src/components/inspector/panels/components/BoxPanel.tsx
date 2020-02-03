import React, { memo } from "react";
import ColorsControl from "../../controls/ColorsControl";

const BoxPanel = () => (
  <ColorsControl withFullColor label="Color" name="bg" enableHues />
);

export default memo(BoxPanel);
