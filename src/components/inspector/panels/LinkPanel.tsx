import React from "react";
import { useForm } from "../../../hooks/useForm";
import { Input, Switch } from "@chakra-ui/core";
import FormControl from "../controls/FormControl";

const LinkPanel = () => {
  const { values, setValueFromEvent, setValue } = useForm();

  return (
    <>
      <FormControl label="href">
        <Input
          size="sm"
          value={values.href || ""}
          type="text"
          name="href"
          onChange={setValueFromEvent}
        />
      </FormControl>

      <FormControl label="to">
        <Input
          size="sm"
          value={values.to || ""}
          type="text"
          name="to"
          onChange={setValueFromEvent}
        />
      </FormControl>

      <FormControl label="Is External" htmlFor="isExternal">
        <Switch
          name="isExternal"
          id="isExternal"
          size="sm"
          isChecked={values.isExternal || false}
          onChange={() => setValue("isExternal", !values.isExternal)}
        />
      </FormControl>
    </>
  );
};

export default LinkPanel;
