import React from "react";
import { Input } from "@chakra-ui/core";
import SizeControl from "../controls/SizeControl";
import FormControl from "../controls/FormControl";
import { useForm } from "../../../hooks/useForm";

const BorderPanel = () => {
  const { values, setValueFromEvent } = useForm();
  return (
    <>
      <FormControl label="Border">
        <Input
          size="sm"
          value={values.border || ""}
          type="text"
          name="border"
          onChange={setValueFromEvent}
        />
      </FormControl>

      <SizeControl
        name="rounded"
        label="Border radius"
        value={values.rounded}
      />
    </>
  );
};

export default BorderPanel;
