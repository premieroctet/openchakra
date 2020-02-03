import React from "react";
import { Switch } from "@chakra-ui/core";
import FormControl from "../../controls/FormControl";
import { useForm } from "../../../../hooks/useForm";
import usePropsSelector from "../../../../hooks/usePropsSelector";

const FormControlPanel = () => {
  const { setValue } = useForm();

  const isInvalid = usePropsSelector("isInvalid");
  const isRequired = usePropsSelector("isRequired");
  const isReadOnly = usePropsSelector("isReadOnly");

  return (
    <>
      <FormControl label="is Invalid" htmlFor="isInvalid">
        <Switch
          name="isInvalid"
          id="isInvalid"
          size="sm"
          isChecked={isInvalid || false}
          onChange={() => setValue("isInvalid", !isInvalid)}
        />
      </FormControl>

      <FormControl label="is Required" htmlFor="isRequired">
        <Switch
          name="isRequired"
          id="isRequired"
          size="sm"
          isChecked={isRequired || false}
          onChange={() => setValue("isRequired", !isRequired)}
        />
      </FormControl>

      <FormControl label="is ReadOnly" htmlFor="isReadOnly">
        <Switch
          name="isReadOnly"
          id="isReadOnly"
          size="sm"
          isChecked={isReadOnly || false}
          onChange={() => setValue("isReadOnly", !isReadOnly)}
        />
      </FormControl>
    </>
  );
};

export default FormControlPanel;
