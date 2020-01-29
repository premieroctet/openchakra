import React from "react";
import { Input, Switch, Select } from "@chakra-ui/core";
import { useForm } from "../../../hooks/useForm";
import SizeControl from "../controls/SizeControl";
import FormControl from "../controls/FormControl";
import ChildrenControl from "../controls/ChildrenControl";

const HeadingPanel = () => {
  const { values, setValueFromEvent, setValue } = useForm();

  return (
    <>
      <ChildrenControl />
      <SizeControl name="size" label="Size" value={values.size} />
      <FormControl label="Font">
        <Input
          size="sm"
          value={values.fontSize || "20px"}
          type="text"
          name="fontSize"
          onChange={setValueFromEvent}
        />
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
