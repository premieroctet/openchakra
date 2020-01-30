import React from "react";
import { Input, SimpleGrid, Select } from "@chakra-ui/core";
import FormControl from "../controls/FormControl";

type DimensionPanelPropsType = {
  handleChange: any;
  values: any;
};

const DimensionPanel = ({ handleChange, values }: DimensionPanelPropsType) => {
  return (
    <>
      <SimpleGrid columns={2} spacing={1}>
        <FormControl hasColumn label="Width">
          <Input
            value={values.width || ""}
            size="sm"
            type="text"
            name="width"
            width="3rem"
            onChange={handleChange}
          />
        </FormControl>

        <FormControl hasColumn label="Height">
          <Input
            rounded="md"
            value={values.height || ""}
            size="sm"
            type="text"
            width="3rem"
            name="height"
            onChange={handleChange}
          />
        </FormControl>
      </SimpleGrid>

      <SimpleGrid columns={2} spacing={1}>
        <FormControl hasColumn label="Min W">
          <Input
            rounded="md"
            value={values.minWidth || ""}
            size="sm"
            type="text"
            width="3rem"
            name="minWidth"
            onChange={handleChange}
          />
        </FormControl>

        <FormControl hasColumn label="Min H">
          <Input
            width="3rem"
            rounded="md"
            value={values.minHeight || ""}
            size="sm"
            type="text"
            name="minHeight"
            onChange={handleChange}
          />
        </FormControl>

        <FormControl hasColumn label="Max W">
          <Input
            rounded="md"
            value={values.maxWidth || ""}
            size="sm"
            type="text"
            name="maxWidth"
            width="3rem"
            onChange={handleChange}
          />
        </FormControl>

        <FormControl hasColumn label="Max H">
          <Input
            rounded="md"
            value={values.maxHeight || ""}
            size="sm"
            width="3rem"
            type="text"
            name="maxHeight"
            onChange={handleChange}
          />
        </FormControl>
      </SimpleGrid>
      <FormControl label="Oveflow">
        <Select
          size="sm"
          value={values.overflow || ""}
          onChange={handleChange}
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

export default DimensionPanel;
