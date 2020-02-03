import React from "react";
import {
  Switch,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb
} from "@chakra-ui/core";
import ColorsControl from "../../controls/ColorsControl";
import FormControl from "../../controls/FormControl";
import { useForm } from "../../../../hooks/useForm";
import SizeControl from "../../controls/SizeControl";
import usePropsSelector from "../../../../hooks/usePropsSelector";

const ProgressPanel = () => {
  const { setValue } = useForm();

  const value = usePropsSelector("value");
  const hasStripe = usePropsSelector("hasStripe");
  const isAnimated = usePropsSelector("isAnimated");
  const size = usePropsSelector("size");

  return (
    <>
      <FormControl label="Value">
        <Slider
          onChange={value => setValue("value", value)}
          min={0}
          max={100}
          step={1}
          defaultValue={value}
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
          isChecked={hasStripe || false}
          onChange={() => setValue("hasStripe", !hasStripe)}
        />
      </FormControl>
      <FormControl label="Is Animated" htmlFor="isAnimated">
        <Switch
          name="isAnimated"
          id="isAnimated"
          size="sm"
          isChecked={isAnimated || false}
          onChange={() => setValue("isAnimated", !isAnimated)}
        />
      </FormControl>

      <ColorsControl label="Color" name="color" />

      <SizeControl options={["sm", "md", "lg"]} value={size} />
    </>
  );
};

export default ProgressPanel;
