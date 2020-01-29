import React from "react";
import { Input, Select, Switch } from "@chakra-ui/core";
import FormControl from "../controls/FormControl";
import { useForm } from "../../../hooks/useForm";

const AvatarPanel = () => {
  const { setValueFromEvent, values, setValue } = useForm();

  return (
    <>
      <FormControl label="Size" htmlFor="size">
        <Select
          name="size"
          id="size"
          size="sm"
          value={values.size || ""}
          onChange={setValueFromEvent}
        >
          <option>2xs</option>
          <option>xs</option>
          <option>sm</option>
          <option>md</option>
          <option>lg</option>
          <option>xl</option>
          <option>2xl</option>
        </Select>
      </FormControl>

      <FormControl label="Show border" htmlFor="showBorder">
        <Switch
          name="showBorder"
          id="showBorder"
          size="sm"
          isChecked={values.showBorder || false}
          onChange={() => setValue("showBorder", !values.showBorder)}
        />
      </FormControl>

      <FormControl label="Name">
        <Input
          value={values.name}
          size="sm"
          type="text"
          name="name"
          onChange={setValueFromEvent}
        />
      </FormControl>

      <FormControl label="Source">
        <Input
          value={values.src}
          size="sm"
          type="text"
          name="src"
          onChange={setValueFromEvent}
        />
      </FormControl>
    </>
  );
};

export default AvatarPanel;
