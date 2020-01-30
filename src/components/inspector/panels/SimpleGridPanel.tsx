import React from "react";
import { Input } from "@chakra-ui/core";
import { useForm } from "../../../hooks/useForm";
import FormControl from "../controls/FormControl";
import ChildrenControl from "../controls/ChildrenControl";

const SimpleGridPanel = () => {
  const { values, setValueFromEvent } = useForm();

  return (
    <>
      <ChildrenControl />
      <FormControl label="Columns">
        <Input
          size="sm"
          value={values.columns || ""}
          type="text"
          name="columns"
          onChange={setValueFromEvent}
        />
      </FormControl>

      <FormControl label="Spacing X">
        <Input
          size="sm"
          value={values.spacingX || "px"}
          type="text"
          name="spacingX"
          onChange={setValueFromEvent}
        />
      </FormControl>

      <FormControl label="Spacing Y">
        <Input
          size="sm"
          value={values.spacingY || "px"}
          type="text"
          name="spacingY"
          onChange={setValueFromEvent}
        />
      </FormControl>

      <FormControl label="minChildWidth">
        <Input
          size="sm"
          value={values.minChildWidth || "120px"}
          type="text"
          name="minChildWidth"
          onChange={setValueFromEvent}
        />
      </FormControl>
    </>
  );
};

export default SimpleGridPanel;
