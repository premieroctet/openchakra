import React from "react";
import { Select } from "@chakra-ui/core";
import ColorsControl from "../../controls/ColorsControl";
import FormControl from "../../controls/FormControl";
import { useForm } from "../../../../hooks/useForm";
import usePropsSelector from "../../../../hooks/usePropsSelector";

const CloseButtonPanel = () => {
  const { setValueFromEvent } = useForm();

  const size = usePropsSelector("size");

  return (
    <>
      <FormControl label="Size" htmlFor="size">
        <Select
          name="size"
          id="size"
          size="sm"
          value={size || ""}
          onChange={setValueFromEvent}
        >
          <option>sm</option>
          <option>md</option>
          <option>lg</option>
        </Select>
      </FormControl>

      <ColorsControl label="Color" name="color" enableHues />
    </>
  );
};

export default CloseButtonPanel;
