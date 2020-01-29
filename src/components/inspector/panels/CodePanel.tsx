import React from "react";
import ColorsControl from "../controls/ColorsControl";
import { useForm } from "../../../hooks/useForm";
import FormControl from "../controls/FormControl";
import { Input } from "@chakra-ui/core";

const CodePanel = () => {
  const { setValueFromEvent, values } = useForm();

  return (
    <>
      <ColorsControl
        label="Variant Color"
        name="variantColor"
        value={values.variantColor}
      />

      <FormControl label="Valeur">
        <Input
          size="sm"
          value={values.children || ""}
          type="text"
          name="children"
          onChange={setValueFromEvent}
        />
      </FormControl>
    </>
  );
};

export default CodePanel;
