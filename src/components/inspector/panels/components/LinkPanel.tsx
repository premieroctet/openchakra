import React, { memo } from "react";
import { useForm } from "../../../../hooks/useForm";
import { Input, Switch } from "@chakra-ui/core";
import FormControl from "../../controls/FormControl";
import usePropsSelector from "../../../../hooks/usePropsSelector";

const LinkPanel = () => {
  const { setValueFromEvent, setValue } = useForm();
  const href = usePropsSelector("href");
  const isExternal = usePropsSelector("isExternal");

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

      <FormControl label="Is external" htmlFor="isExternal">
        <Switch
          name="isExternal"
          id="isExternal"
          size="sm"
          isChecked={isExternal || false}
          onChange={() => setValue("isExternal", !isExternal)}
        />
      </FormControl>
    </>
  );
};

export default memo(LinkPanel);
