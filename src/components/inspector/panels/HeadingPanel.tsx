import React from "react";
import { Switch, Select } from "@chakra-ui/core";
import { useForm } from "../../../hooks/useForm";
import FormControl from "../controls/FormControl";
import ChildrenControl from "../controls/ChildrenControl";

const HeadingPanel = () => {
  const { values, setValueFromEvent, setValue } = useForm();

  return (
    <>
      <ChildrenControl />
      <FormControl label="Size" htmlFor="size">
        <Select
          name="size"
          id="size"
          size="sm"
          value={values.size}
          onChange={setValueFromEvent}
        >
          <option>xs</option>
          <option>sm</option>
          <option>md</option>
          <option>lg</option>
          <option>xl</option>
          <option>2xl</option>
        </Select>
      </FormControl>
      <FormControl label="As">
        <Select
          size="sm"
          value={values.as || ""}
          onChange={setValueFromEvent}
          name="as"
        >
          <option>h1</option>
          <option>h2</option>
          <option>h3</option>
          <option>h4</option>
          <option>h5</option>
          <option>h6</option>
        </Select>
      </FormControl>
      <FormControl label="Is Truncated" htmlFor="isTruncated">
        <Switch
          name="isTruncated"
          id="isTruncated"
          size="sm"
          isChecked={values.isTruncated || false}
          onChange={() => setValue("isTruncated", !values.isTruncated)}
        />
      </FormControl>
    </>
  );
};

export default HeadingPanel;
