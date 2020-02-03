import React, { memo } from "react";
import { useForm } from "../../../../hooks/useForm";
import { Input } from "@chakra-ui/core";
import FormControl from "../../controls/FormControl";
import usePropsSelector from "../../../../hooks/usePropsSelector";
import SwitchControl from "../../controls/SwitchControl";

const LinkPanel = () => {
  const { setValueFromEvent } = useForm();
  const href = usePropsSelector("href");

  return (
    <>
      <FormControl label="Href" htmlFor="href">
        <Input
          name="href"
          id="href"
          size="sm"
          value={href || ""}
          onChange={setValueFromEvent}
        />
      </FormControl>

      <SwitchControl label="External" name="isExternal" />
    </>
  );
};

export default memo(LinkPanel);
