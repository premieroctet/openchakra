import React, { memo } from "react";
import { Select, Input } from "@chakra-ui/core";
import ColorsControl from "../../controls/ColorsControl";
import { useForm } from "../../../../hooks/useForm";
import FormControl from "../../controls/FormControl";
import usePropsSelector from "../../../../hooks/usePropsSelector";

const SpinnerPanel = () => {
  const { setValueFromEvent } = useForm();

  const label = usePropsSelector("label");
  const size = usePropsSelector("size");
  const thickness = usePropsSelector("thickness");
  const speed = usePropsSelector("speed");

  return (
    <>
      <FormControl label="Label">
        <Input
          size="sm"
          value={label || ""}
          type="text"
          name="label"
          onChange={setValueFromEvent}
        />
      </FormControl>

      <ColorsControl label="Color" name="color" enableHues />

      <ColorsControl label="Empty color" name="emptyColor" enableHues />

      <FormControl label="Size" htmlFor="size">
        <Select
          name="size"
          id="size"
          size="sm"
          value={size || ""}
          onChange={setValueFromEvent}
        >
          <option>xs</option>
          <option>sm</option>
          <option>md</option>
          <option>lg</option>
          <option>xl</option>
        </Select>
      </FormControl>

      <FormControl label="Thickness">
        <Input
          size="sm"
          value={thickness || ""}
          type="text"
          name="thickness"
          onChange={setValueFromEvent}
        />
      </FormControl>

      <FormControl label="Speed">
        <Input
          placeholder="0.45s"
          size="sm"
          value={speed || ""}
          type="text"
          name="speed"
          onChange={setValueFromEvent}
        />
      </FormControl>
    </>
  );
};

export default memo(SpinnerPanel);
