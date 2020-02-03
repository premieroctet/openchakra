import React, { memo } from "react";
import FormControl from "../../controls/FormControl";
import { Select } from "@chakra-ui/core";
import { useForm } from "../../../../hooks/useForm";
import usePropsSelector from "../../../../hooks/usePropsSelector";

const CodePanel = () => {
  const { setValueFromEvent } = useForm();
  const styleType = usePropsSelector("styleType");

  return (
    <>
      <FormControl label="Style type" htmlFor="styleType">
        <Select
          name="styleType"
          id="styleType"
          size="sm"
          value={styleType || "md"}
          onChange={setValueFromEvent}
        >
          <option>none</option>
          <option>disc</option>
          <option>circle</option>
          <option>square</option>
          <option>decimal</option>
          <option>georgian</option>
          <option>cjk-ideographic</option>
          <option>kannada</option>
        </Select>
      </FormControl>
    </>
  );
};

export default memo(CodePanel);
