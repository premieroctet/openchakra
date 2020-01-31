import React, { FormEvent, useState, ChangeEvent, memo } from "react";
import { useForm } from "../../hooks/useForm";
import { Box, InputGroup, InputRightElement, Input } from "@chakra-ui/core";
import { IoIosFlash } from "react-icons/io";

const QuickPropsPanel = () => {
  const [quickProps, setQuickProps] = useState("");
  const { setValue } = useForm();

  return (
    <form
      onSubmit={(event: FormEvent) => {
        event.preventDefault();

        const [name, value] = quickProps.split(":");
        setValue(name, value);
        setQuickProps("");
      }}
    >
      <InputGroup mb={2} size="sm">
        <InputRightElement
          children={<Box as={IoIosFlash} color="gray.300" />}
        />
        <Input
          value={quickProps}
          placeholder="props:value"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setQuickProps(event.target.value)
          }
        />
      </InputGroup>
    </form>
  );
};

export default memo(QuickPropsPanel);
