import React, { memo } from "react";
import { Select } from "@chakra-ui/core";
import FormControl from "../../controls/FormControl";
import { useForm } from "../../../../hooks/useForm";
import ColorsControl from "../../controls/ColorsControl";
import usePropsSelector from "../../../../hooks/usePropsSelector";

const DividerPanel = () => {
  const { setValueFromEvent } = useForm();
  const orientation = usePropsSelector("orientation");

  return (
    <>
      <FormControl label="Orientation" htmlFor="orientation">
        <Select
          name="orientation"
          id="orientation"
          size="sm"
          value={orientation || "horizontal"}
          onChange={setValueFromEvent}
        >
          <option>horizontal</option>
          <option>vertical</option>
        </Select>
      </FormControl>
      <ColorsControl
        withFullColor
        label="Border color"
        name="borderColor"
        enableHues
      />
    </>
  );
};

export default memo(DividerPanel);
