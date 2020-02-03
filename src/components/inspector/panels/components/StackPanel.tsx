import React from "react";
import FormControl from "../../controls/FormControl";
import { useForm } from "../../../../hooks/useForm";
import {
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb
} from "@chakra-ui/core";
import usePropsSelector from "../../../../hooks/usePropsSelector";
import SwitchControl from "../../controls/SwitchControl";

const StackPanel = () => {
  const { setValue, setValueFromEvent } = useForm();

  const direction = usePropsSelector("direction");
  const spacing = usePropsSelector("spacing");

  return (
    <>
      <SwitchControl label="Inline" name="isInline" />
      <SwitchControl label="Reversed" name="isReversed" />
      <SwitchControl label="Wrap children" name="shouldWrapChildren" />

      <FormControl label="Direction" htmlFor="direction">
        <Select
          name="direction"
          id="direction"
          size="sm"
          value={direction || "unset"}
          onChange={setValueFromEvent}
        >
          <option>row</option>
          <option>row-reverse</option>
          <option>column</option>
          <option>column-reverse</option>
          <option>inherit</option>
          <option>initial</option>
          <option>unset</option>
        </Select>
      </FormControl>

      <FormControl label="Spacing">
        <Slider
          onChange={spacing => setValue("spacing", spacing)}
          min={0}
          max={100}
          step={1}
          defaultValue={spacing}
        >
          <SliderTrack />
          <SliderFilledTrack />
          <SliderThumb />
        </Slider>
      </FormControl>
    </>
  );
};

export default StackPanel;
