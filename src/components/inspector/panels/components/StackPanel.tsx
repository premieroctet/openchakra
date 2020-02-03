import React from "react";
import FormControl from "../../controls/FormControl";
import { useForm } from "../../../../hooks/useForm";
import {
  Switch,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb
} from "@chakra-ui/core";
import usePropsSelector from "../../../../hooks/usePropsSelector";

const StackPanel = () => {
  const { setValue, setValueFromEvent } = useForm();

  const isInline = usePropsSelector("isInline");
  const isReversed = usePropsSelector("isReversed");
  const shouldWrapChildren = usePropsSelector("shouldWrapChildren");
  const direction = usePropsSelector("direction");
  const spacing = usePropsSelector("spacing");

  return (
    <>
      <FormControl label="Inline" htmlFor="isInline">
        <Switch
          name="isInline"
          id="isInline"
          size="sm"
          isChecked={isInline || false}
          onChange={() => setValue("isInline", !isInline)}
        />
      </FormControl>
      <FormControl label="Reversed" htmlFor="isReversed">
        <Switch
          name="isReversed"
          id="isReversed"
          size="sm"
          isChecked={isReversed || false}
          onChange={() => setValue("isReversed", !isReversed)}
        />
      </FormControl>
      <FormControl label="Wrap children" htmlFor="shouldWrapChildren">
        <Switch
          name="shouldWrapChildren"
          id="shouldWrapChildren"
          size="sm"
          isChecked={shouldWrapChildren || false}
          onChange={() => setValue("shouldWrapChildren", !shouldWrapChildren)}
        />
      </FormControl>

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
