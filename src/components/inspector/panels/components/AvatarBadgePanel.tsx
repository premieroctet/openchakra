import React, { memo } from "react";
import ColorsControl from "../../controls/ColorsControl";

const AvatarPanel = () => (
  <>
    <ColorsControl withFullColor label="Color" name="bg" enableHues />

    <ColorsControl
      withFullColor
      label="Border color"
      name="borderColor"
      enableHues
    />
  </>
);

export default memo(AvatarPanel);
