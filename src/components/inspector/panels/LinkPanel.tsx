import React from "react";
import { useForm } from "../../../hooks/useForm";
import { Input, Switch } from "@chakra-ui/core";
import FormControl from "../controls/FormControl";

const LinkPanel = () => {
  const { values, setValueFromEvent, setValue } = useForm();

  return (
    <>
      <FormControl label="Href" htmlFor="href">
        <Input
          name="href"
          id="href"
          size="sm"
          value={values.href || ""}
          onChange={setValueFromEvent}
        />
      </FormControl>

      <FormControl label="Is external" htmlFor="isExternal">
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
