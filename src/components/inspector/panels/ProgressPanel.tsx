import React from "react";
import {
  Switch,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb
} from "@chakra-ui/core";
import ColorsControl from "../controls/ColorsControl";
import FormControl from "../controls/FormControl";
import { useForm } from "../../../hooks/useForm";
import SizeControl from "../controls/SizeControl";

const ProgressPanel = () => {
  const { values, setValue } = useForm();

  return (
    <>
      <FormControl label="Value">
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

      <SizeControl options={["sm", "md", "lg"]} value={values.size} />
    </>
  );
};

export default ProgressPanel;
