import React, { memo } from "react";
import { Input } from "@chakra-ui/core";
import { useForm } from "../../../../hooks/useForm";
import FormControl from "../../controls/FormControl";
import usePropsSelector from "../../../../hooks/usePropsSelector";

const SimpleGridPanel = () => {
  const { setValueFromEvent } = useForm();

  const columns = usePropsSelector("columns");
  const spacingX = usePropsSelector("spacingX");
  const spacingY = usePropsSelector("spacingY");
  const minChildWidth = usePropsSelector("minChildWidth");

  return (
    <>
      <FormControl label="Columns">
        <Input
          size="sm"
          value={columns || ""}
          type="text"
          name="columns"
          onChange={setValueFromEvent}
        />
      </FormControl>

      <FormControl label="Spacing X">
        <Input
          size="sm"
          value={spacingX || ""}
          type="text"
          name="spacingX"
          onChange={setValueFromEvent}
        />
      </FormControl>

      <FormControl label="Spacing Y">
        <Input
          size="sm"
          value={spacingY || ""}
          type="text"
          name="spacingY"
          onChange={setValueFromEvent}
        />
      </FormControl>

      <FormControl label="minChildWidth">
        <Input
          size="sm"
          value={minChildWidth || ""}
          type="text"
          name="minChildWidth"
          onChange={setValueFromEvent}
        />
      </FormControl>
    </>
  );
};

export default memo(SimpleGridPanel);
