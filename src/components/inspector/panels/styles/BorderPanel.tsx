import React, { memo } from "react";
import { Input } from "@chakra-ui/core";
import SizeControl from "../../controls/SizeControl";
import FormControl from "../../controls/FormControl";
import { useForm } from "../../../../hooks/useForm";
import usePropsSelector from "../../../../hooks/usePropsSelector";

const BorderPanel = () => {
  const { setValueFromEvent } = useForm();
  const border = usePropsSelector("border");
  const rounded = usePropsSelector("rounded");

  return (
    <>
      <FormControl label="Border">
        <Input
          size="sm"
          value={border || ""}
          type="text"
          name="border"
          onChange={setValueFromEvent}
        />
      </FormControl>

      <SizeControl name="rounded" label="Border radius" value={rounded} />
    </>
  );
};

export default memo(BorderPanel);
