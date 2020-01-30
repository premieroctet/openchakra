import React from "react";
import { Select } from "@chakra-ui/core";
import FormControl from "../controls/FormControl";
import { useForm } from "../../../hooks/useForm";

const AlertPanel = () => {
  const { values, setValueFromEvent } = useForm();

  return (
    <>
      <FormControl label="Status" htmlFor="status">
        <Select
          name="status"
          id="status"
          size="sm"
          value={values.status || "info"}
          onChange={setValueFromEvent}
        >
          <option>error</option>
          <option>success</option>
          <option>warning</option>
          <option>info</option>
        </Select>
      </FormControl>

      <FormControl label="Variant" htmlFor="variant">
        <Select
          name="variant"
          id="variant"
          size="sm"
          value={values.variant || "subtle"}
          onChange={setValueFromEvent}
        >
          <option>subtle</option>
          <option>solid</option>
          <option>left-accent</option>
          <option>top-accent</option>
        </Select>
      </FormControl>
    </>
  );
};

export default AlertPanel;
