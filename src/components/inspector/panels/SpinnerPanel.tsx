import React from "react";
import { Select, Input } from "@chakra-ui/core";
import ColorsControl from "../controls/ColorsControl";
import { useForm } from "../../../hooks/useForm";
import FormControl from "../controls/FormControl";

const SpinnerPanel = () => {
  const { values, setValueFromEvent } = useForm();

  return (
    <>
      <FormControl label="Label">
        <Input
          size="sm"
          value={values.label || ""}
          type="text"
          name="label"
          onChange={setValueFromEvent}
        />
      </FormControl>

      <ColorsControl
        label="Color"
        name="color"
        value={values.color || ""}
        enableHues
      />

      <ColorsControl
        label="Empty color"
        name="emptyColor"
        value={values.emptyColor || ""}
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

      <FormControl label="Thickness">
        <Input
          size="sm"
          value={values.thickness || ""}
          type="text"
          name="thickness"
          onChange={setValueFromEvent}
        />
      </FormControl>

      <FormControl label="Speed">
        <Input
          placeholder="0.45s"
          size="sm"
          value={values.speed || ""}
          type="text"
          name="speed"
          onChange={setValueFromEvent}
        />
      </FormControl>
    </>
  );
};

export default SpinnerPanel;
