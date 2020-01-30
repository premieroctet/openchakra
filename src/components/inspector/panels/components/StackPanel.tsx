import React from "react";
import FormControl from "../controls/FormControl";
import { useForm } from "../../../hooks/useForm";
import ChildrenControl from "../controls/ChildrenControl";
import {
  Switch,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb
} from "@chakra-ui/core";

const StackPanel = () => {
  const { values, setValue, setValueFromEvent } = useForm();

  return (
    <>
      <ChildrenControl />
      <FormControl label="Is Inline" htmlFor="isInline">
        <Switch
          name="isInline"
          id="isInline"
          size="sm"
          isChecked={values.isInline || false}
          onChange={() => setValue("isInline", !values.isInline)}
        />
      </FormControl>
      <FormControl label="Is Reversed" htmlFor="isReversed">
        <Switch
          name="isReversed"
          id="isReversed"
          size="sm"
          isChecked={values.isReversed || false}
          onChange={() => setValue("isReversed", !values.isReversed)}
        />
      </FormControl>
      <FormControl label="shouldWrapChildren" htmlFor="shouldWrapChildren">
        <Switch
          name="shouldWrapChildren"
          id="shouldWrapChildren"
          size="sm"
          isChecked={values.shouldWrapChildren || false}
          onChange={() =>
            setValue("shouldWrapChildren", !values.shouldWrapChildren)
          }
        />
      </FormControl>

      <FormControl label="Direction" htmlFor="direction">
        <Select
          name="direction"
          id="direction"
          size="sm"
          value={values.direction || "unset"}
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
          defaultValue={values.spacing}
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
