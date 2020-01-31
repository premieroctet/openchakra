import React from "react";
import { Switch, Select } from "@chakra-ui/core";
import FormControl from "../controls/FormControl";
import { useForm } from "../../../hooks/useForm";
import ColorsControl from "../controls/ColorsControl";

const TabsPanel = () => {
  const { values, setValue, setValueFromEvent } = useForm();

  return (
    <>
      <FormControl label="is Manual" htmlFor="isManual">
        <Switch
          name="isManual"
          id="isManual"
          size="sm"
          isChecked={values.isManual || false}
          onChange={() => setValue("isManual", !values.isManual)}
        />
      </FormControl>
      <FormControl label="is Fitted" htmlFor="isFitted">
        <Switch
          name="isFitted"
          id="isFitted"
          size="sm"
          isChecked={values.isFitted || false}
          onChange={() => setValue("isFitted", !values.isFitted)}
        />
      </FormControl>

      <FormControl label="Variant" htmlFor="variant">
        <Select
          name="variant"
          id="variant"
          size="sm"
          value={values.variant || ""}
          onChange={setValueFromEvent}
        >
          <option>line</option>
          <option>enclosed</option>
          <option>enclosed-colored</option>
          <option>soft-rounded</option>
          <option>solid-rounded</option>
          <option>unstyled</option>
        </Select>
      </FormControl>

      <FormControl label="Orientation" htmlFor="orientation">
        <Select
          name="orientation"
          id="orientation"
          size="sm"
          value={values.orientation || ""}
          onChange={setValueFromEvent}
        >
          <option>horizontal</option>
          <option>vertical</option>
        </Select>
      </FormControl>

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
      <ColorsControl
        label="Variant Color"
        name="variantColor"
        value={values.variantColor}
      />
    </>
  );
};

export default TabsPanel;
