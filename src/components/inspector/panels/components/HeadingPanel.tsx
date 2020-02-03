import React, { memo } from "react";
import { Switch, Select } from "@chakra-ui/core";
import { useForm } from "../../../../hooks/useForm";
import FormControl from "../../controls/FormControl";
import ChildrenControl from "../../controls/ChildrenControl";
import usePropsSelector from "../../../../hooks/usePropsSelector";

const HeadingPanel = () => {
  const { setValueFromEvent, setValue } = useForm();

  const size = usePropsSelector("size");
  const as = usePropsSelector("as");
  const isTruncated = usePropsSelector("isTruncated");

  return (
    <>
      <ChildrenControl />
      <FormControl label="Size" htmlFor="size">
        <Select
          name="size"
          id="size"
          size="sm"
          value={size}
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
          value={as || ""}
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
          isChecked={isTruncated || false}
          onChange={() => setValue("isTruncated", !isTruncated)}
        />
      </FormControl>
    </>
  );
};

export default memo(HeadingPanel);
