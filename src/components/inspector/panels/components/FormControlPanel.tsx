import React from "react";
import { Switch } from "@chakra-ui/core";
import FormControl from "../controls/FormControl";
import { useForm } from "../../../hooks/useForm";

const FormControlPanel = () => {
  const { values, setValue } = useForm();

  return (
    <>
      <FormControl label="is Invalid" htmlFor="isInvalid">
        <Switch
          name="isInvalid"
          id="isInvalid"
          size="sm"
          isChecked={values.isInvalid || false}
          onChange={() => setValue("isInvalid", !values.isInvalid)}
        />
      </FormControl>
      <FormControl label="is Required" htmlFor="isRequired">
        <Switch
          name="isRequired"
          id="isRequired"
          size="sm"
          isChecked={values.isRequired || false}
          onChange={() => setValue("isRequired", !values.isRequired)}
        />
      </FormControl>
      <FormControl label="is ReadOnly" htmlFor="isReadOnly">
        <Switch
          name="isReadOnly"
          id="isReadOnly"
          size="sm"
          isChecked={values.isReadOnly || false}
          onChange={() => setValue("isReadOnly", !values.isReadOnly)}
        />
      </FormControl>
    </>
  );
};

export default FormControlPanel;
