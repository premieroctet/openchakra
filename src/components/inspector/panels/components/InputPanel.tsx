import React, { memo } from "react";
import { useForm } from "../../../../hooks/useForm";
import { Select } from "@chakra-ui/core";
import FormControl from "../../controls/FormControl";
import usePropsSelector from "../../../../hooks/usePropsSelector";
import SizeControl from "../../controls/SizeControl";
import SwitchControl from "../../controls/SwitchControl";

const InputPanel = () => {
  const { setValueFromEvent } = useForm();

  const size = usePropsSelector("size");
  const variant = usePropsSelector("variant");

  return (
    <>
      <SizeControl label="Size" options={["sm", "md", "lg"]} value={size} />

      <FormControl htmlFor="variant" label="Variant">
        <Select
          id="variant"
          onChange={setValueFromEvent}
          name="variant"
          size="sm"
          value={variant || ""}
        >
          <option>outline</option>
          <option>unstyled</option>
          <option>flushed</option>
          <option>filled</option>
        </Select>
      </FormControl>

      <SwitchControl label="Disabled" name="isDisabled" />
      <SwitchControl label="Invalid" name="isInvalid" />
      <SwitchControl label="Required" name="isRequired" />
      <SwitchControl label="Read Only" name="isReadOnly" />
      <SwitchControl label="Full width" name="isFullWidth" />
    </>
  );
};

export default memo(InputPanel);
