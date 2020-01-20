import React from "react";
import FormControl from "../controls/FormControl";
import {
  Slider,
  SliderTrack,
  SliderThumb,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  SliderFilledTrack,
  Select
} from "@chakra-ui/core";
import { useForm } from "../../../hooks/useForm";

const AvatarGroupPanel = () => {
  const { setValue, values, setValueFromEvent } = useForm();

  return (
    <>
      <FormControl label="Size" htmlFor="size">
        <Select
          name="size"
          id="size"
          size="sm"
          value={values.size || ""}
          onChange={setValueFromEvent}
        >
          <option>2xs</option>
          <option>xs</option>
          <option>sm</option>
          <option>md</option>
          <option>lg</option>
          <option>xl</option>
          <option>2xl</option>
        </Select>
      </FormControl>

      <FormControl label="Spacing">
        <Slider
          onChange={value => setValue("spacing", value)}
          min={-3}
          max={6}
          step={1}
          defaultValue={values.spacing}
        >
          <SliderTrack />
          <SliderFilledTrack />
          <SliderThumb />
        </Slider>
      </FormControl>

      <FormControl label="max">
        <NumberInput
          size="sm"
          onChange={value => setValue("max", value)}
          value={values.max}
          min={1}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    </>
  );
};

export default AvatarGroupPanel;
