import React from "react";
import {
  Switch,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb
} from "@chakra-ui/core";
import ColorsControl from "../controls/ColorsControl";
import FormControl from "../controls/FormControl";
import { useForm } from "../../../hooks/useForm";

const ProgressPanel = () => {
  const { values, setValueFromEvent, setValue } = useForm();

  return (
    <>
      <FormControl label="Valeur">
        <Slider
          onChange={value => setValue("value", value)}
          min={0}
          max={100}
          step={1}
          defaultValue={values.value}
        >
          <SliderTrack />
          <SliderFilledTrack />
          <SliderThumb />
        </Slider>
      </FormControl>

      <FormControl label="Has Stripe" htmlFor="hasStripe">
        <Switch
          name="hasStripe"
          id="hasStripe"
          size="sm"
          isChecked={values.hasStripe || false}
          onChange={() => setValue("hasStripe", !values.hasStripe)}
        />
      </FormControl>
      <FormControl label="Is Animated" htmlFor="isAnimated">
        <Switch
          name="isAnimated"
          id="isAnimated"
          size="sm"
          isChecked={values.isAnimated || false}
          onChange={() => setValue("isAnimated", !values.isAnimated)}
        />
      </FormControl>

      <ColorsControl label="Color" name="color" value={values.color} />

      <FormControl label="Size" htmlFor="size">
        <Select
          name="size"
          id="size"
          size="sm"
          value={values.size || ""}
          onChange={setValueFromEvent}
        >
          <option>sm</option>
          <option>md</option>
          <option>lg</option>
        </Select>
      </FormControl>
    </>
  );
};

export default ProgressPanel;
