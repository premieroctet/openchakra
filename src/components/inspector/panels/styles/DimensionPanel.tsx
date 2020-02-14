import React, { memo } from "react";
import { Input, SimpleGrid, Select } from "@chakra-ui/core";
import FormControl from "../../controls/FormControl";
import usePropsSelector from "../../../../hooks/usePropsSelector";
import { useForm } from "../../../../hooks/useForm";

const DimensionPanel = () => {
  const { setValueFromEvent } = useForm();

  const width = usePropsSelector("width");
  const height = usePropsSelector("height");
  const minWidth = usePropsSelector("minWidth");
  const minHeight = usePropsSelector("minHeight");
  const maxWidth = usePropsSelector("maxWidth");
  const maxHeight = usePropsSelector("maxHeight");
  const overflow = usePropsSelector("overflow");

  return (
    <>
      <SimpleGrid columns={2} spacing={1}>
        <FormControl hasColumn label="Width">
          <Input
            value={width || ""}
            size="sm"
            type="text"
            name="width"
            width="3rem"
            onChange={setValueFromEvent}
          />
        </FormControl>

        <FormControl hasColumn label="Height">
          <Input
            rounded="md"
            value={height || ""}
            size="sm"
            type="text"
            width="3rem"
            name="height"
            onChange={setValueFromEvent}
          />
        </FormControl>
      </SimpleGrid>

      <SimpleGrid columns={2} spacing={1}>
        <FormControl hasColumn label="Min W">
          <Input
            rounded="md"
            value={minWidth || ""}
            size="sm"
            type="text"
            width="3rem"
            name="minWidth"
            onChange={setValueFromEvent}
          />
        </FormControl>

        <FormControl hasColumn label="Min H">
          <Input
            width="3rem"
            rounded="md"
            value={minHeight || ""}
            size="sm"
            type="text"
            name="minHeight"
            onChange={setValueFromEvent}
          />
        </FormControl>

        <FormControl hasColumn label="Max W">
          <Input
            rounded="md"
            value={maxWidth || ""}
            size="sm"
            type="text"
            name="maxWidth"
            width="3rem"
            onChange={setValueFromEvent}
          />
        </FormControl>

        <FormControl hasColumn label="Max H">
          <Input
            rounded="md"
            value={maxHeight || ""}
            size="sm"
            width="3rem"
            type="text"
            name="maxHeight"
            onChange={setValueFromEvent}
          />
        </FormControl>
      </SimpleGrid>
      <FormControl label="Overflow">
        <Select
          size="sm"
          value={overflow || ""}
          onChange={setValueFromEvent}
          name="overflow"
        >
          <option>visible</option>
          <option>hidden</option>
          <option>scroll</option>
        </Select>
      </FormControl>
    </>
  );
};

export default memo(DimensionPanel);
