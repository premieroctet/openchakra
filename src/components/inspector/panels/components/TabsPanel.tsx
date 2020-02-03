import React from "react";
import { Select } from "@chakra-ui/core";
import FormControl from "../../controls/FormControl";
import { useForm } from "../../../../hooks/useForm";
import ColorsControl from "../../controls/ColorsControl";
import usePropsSelector from "../../../../hooks/usePropsSelector";
import SwitchControl from "../../controls/SwitchControl";

const TabsPanel = () => {
  const { setValueFromEvent } = useForm();

  const variant = usePropsSelector("variant");
  const orientation = usePropsSelector("orientation");
  const size = usePropsSelector("size");

  return (
    <>
      <SwitchControl label="Manual" name="isManual" />
      <SwitchControl label="Fitted" name="isFitted" />

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
