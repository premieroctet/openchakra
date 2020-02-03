import React from "react";
import { Switch, Select } from "@chakra-ui/core";
import FormControl from "../../controls/FormControl";
import { useForm } from "../../../../hooks/useForm";
import ColorsControl from "../../controls/ColorsControl";
import usePropsSelector from "../../../../hooks/usePropsSelector";

const TabsPanel = () => {
  const { setValue, setValueFromEvent } = useForm();

  const isManual = usePropsSelector("isManual");
  const isFitted = usePropsSelector("isFitted");
  const variant = usePropsSelector("variant");
  const orientation = usePropsSelector("orientation");
  const size = usePropsSelector("size");

  return (
    <>
      <FormControl label="is Manual" htmlFor="isManual">
        <Switch
          name="isManual"
          id="isManual"
          size="sm"
          isChecked={isManual || false}
          onChange={() => setValue("isManual", !isManual)}
        />
      </FormControl>
      <FormControl label="is Fitted" htmlFor="isFitted">
        <Switch
          name="isFitted"
          id="isFitted"
          size="sm"
          isChecked={isFitted || false}
          onChange={() => setValue("isFitted", !isFitted)}
        />
      </FormControl>

      <FormControl label="Variant" htmlFor="variant">
        <Select
          name="variant"
          id="variant"
          size="sm"
          value={variant || ""}
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
          value={orientation || ""}
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
          value={size || ""}
          onChange={setValueFromEvent}
        >
          <option>sm</option>
          <option>md</option>
          <option>lg</option>
        </Select>
      </FormControl>
      <ColorsControl label="Variant Color" name="variantColor" />
    </>
  );
};

export default TabsPanel;
