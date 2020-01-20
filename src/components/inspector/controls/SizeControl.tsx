import React, { ReactNode } from "react";
import FormControl from "./FormControl";
import { Select } from "@chakra-ui/core";
import { useForm } from "../../../hooks/useForm";

type SizeControlPropsType = {
  name: string;
  label: string | ReactNode;
  value: string;
};

const SizeControl = (props: SizeControlPropsType) => {
  const { setValueFromEvent } = useForm();

  return (
    <FormControl label={props.label} htmlFor="variant">
      <Select
        name={props.name}
        id={props.name}
        size="sm"
        value={props.value || ""}
        onChange={setValueFromEvent}
      >
        <option>-</option>
        <option>xs</option>
        <option>sm</option>
        <option>md</option>
        <option>lg</option>
      </Select>
    </FormControl>
  );
};

export default SizeControl;
