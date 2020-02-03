import React, { memo } from "react";
import { useForm } from "../../../../hooks/useForm";
import { Switch, Select } from "@chakra-ui/core";
import FormControl from "../../controls/FormControl";
import usePropsSelector from "../../../../hooks/usePropsSelector";
import SizeControl from "../../controls/SizeControl";

const InputPanel = () => {
  const { setValue, setValueFromEvent } = useForm();

  const isInvalid = usePropsSelector("isInvalid");
  const isDisabled = usePropsSelector("isDisabled");
  const isRequired = usePropsSelector("isRequired");
  const isReadOnly = usePropsSelector("isReadOnly");
  const isFullWidth = usePropsSelector("isFullWidth");
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

      <FormControl label="Disabled" htmlFor="isDisabled">
        <Switch
          name="isDisabled"
          id="isDisabled"
          size="sm"
          isChecked={isDisabled || false}
          onChange={() => setValue("isDisabled", !isDisabled)}
        />
      </FormControl>

      <FormControl label="Invalid" htmlFor="isInvalid">
        <Switch
          name="isInvalid"
          id="isInvalid"
          size="sm"
          isChecked={isInvalid || false}
          onChange={() => setValue("isInvalid", !isInvalid)}
        />
      </FormControl>

      <FormControl label="Required" htmlFor="isRequired">
        <Switch
          name="isRequired"
          id="isRequired"
          size="sm"
          isChecked={isRequired || false}
          onChange={() => setValue("isRequired", !isRequired)}
        />
      </FormControl>

      <FormControl label="Read Only" htmlFor="isReadOnly">
        <Switch
          name="isReadOnly"
          id="isReadOnly"
          size="sm"
          isChecked={isReadOnly || false}
          onChange={() => setValue("isReadOnly", !isReadOnly)}
        />
      </FormControl>

      <FormControl label="Full width" htmlFor="isFullWidth">
        <Switch
          name="isFullWidth"
          id="isFullWidth"
          size="sm"
          isChecked={isFullWidth || false}
          onChange={() => setValue("isFullWidth", !isFullWidth)}
        />
      </FormControl>
    </>
  );
};

export default memo(InputPanel);
