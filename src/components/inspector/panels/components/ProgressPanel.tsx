import React from "react";
import {
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
import SwitchControl from "../../controls/SwitchControl";

const ProgressPanel = () => {
  const { setValue } = useForm();

  const value = usePropsSelector("value");
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

      <SwitchControl label="Has Stripe" name="hasStripe" />
      <SwitchControl label="Is Animated" name="isAnimated" />

      <ColorsControl label="Color" name="color" />

      <SizeControl options={["sm", "md", "lg"]} value={size} />
    </>
  );
};

export default ProgressPanel;
