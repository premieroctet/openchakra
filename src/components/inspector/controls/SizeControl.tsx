import React, { ReactNode } from "react";
import FormControl from "./FormControl";
import { Select } from "@chakra-ui/core";
import { useForm } from "../../../hooks/useForm";

export type Size = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type SizeControlPropsType = {
  name?: string;
  label?: string | ReactNode;
  value: string;
  options?: Size[];
};

const options = ["xs", "sm", "md", "lg"];

const SizeControl = (props: SizeControlPropsType) => {
  const { setValueFromEvent } = useForm();
  const choices = props.options || options;

  return (
    <FormControl label={props.label} htmlFor={props.name || "size"}>
      <Select
        size="sm"
        id={props.name || "size"}
        name={props.name || "size"}
        value={props.value || ""}
        onChange={setValueFromEvent}
      >
        {choices.map(choice => (
          <option>{choice}</option>
        ))}
      </Select>
    </FormControl>
  );
};

export default SizeControl;
