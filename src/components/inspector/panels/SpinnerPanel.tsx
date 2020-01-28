import React from "react";
import { Select, Input } from "@chakra-ui/core";
import ColorsControl from "../controls/ColorsControl";
import { useForm } from "../../../hooks/useForm";
import FormControl from "../controls/FormControl";

const SpinnerPanel = () => {
  const { values, setValueFromEvent } = useForm();

  return (
    <>
      <FormControl label="label">
        <Input
          size="sm"
          value={values.label || "Loading..."}
          type="text"
          name="label"
          onChange={setValueFromEvent}
        />
      </FormControl>
      <ColorsControl
        label="Color"
        name="color"
        value={values.color}
        enableHues
      />
      <FormControl label="Size" htmlFor="size">
        <Select
          name="size"
          id="size"
          size="sm"
          value={values.size || ""}
          onChange={setValueFromEvent}
        >
          <option>xs</option>
          <option>sm</option>
          <option>md</option>
          <option>lg</option>
          <option>xl</option>
        </Select>
      </FormControl>

      <FormControl label="thickness">
        <Input
          size="sm"
          value={values.thickness || "px"}
          type="text"
          name="thickness"
          onChange={setValueFromEvent}
        />
      </FormControl>

      <ColorsControl
        label="Half Circle Color"
        name="emptyColor"
        value={values.emptyColor}
        enableHues
      />

      <FormControl label="spedd">
        <Input
          size="sm"
          value={values.speed || "s"}
          type="text"
          name="speed"
          onChange={setValueFromEvent}
        />
      </FormControl>
    </>
  );
};

export default SpinnerPanel;
