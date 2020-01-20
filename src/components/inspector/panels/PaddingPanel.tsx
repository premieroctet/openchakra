import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  InputGroup,
  InputLeftElement,
  Icon,
  Box
} from "@chakra-ui/core";

type PaddingPanelPropsType = {
  handleChange: any;
  values: any;
  type: "margin" | "padding";
};

const ATTRIBUTES = {
  margin: {
    all: "m",
    left: "ml",
    right: "mr",
    bottom: "mb",
    top: "mt"
  },
  padding: {
    all: "p",
    left: "pl",
    right: "pr",
    bottom: "pb",
    top: "pt"
  }
};

const PaddingPanel = ({
  type,
  handleChange,
  values
}: PaddingPanelPropsType) => {
  return (
    <Box mb={4}>
      <FormControl>
        <FormLabel fontSize="xs" htmlFor="width" textTransform="capitalize">
          {type}
        </FormLabel>

        <InputGroup size="sm">
          <Input
            mb={1}
            placeholder="All"
            size="sm"
            type="text"
            name={ATTRIBUTES[type].all}
            value={values[ATTRIBUTES[type].all] || ""}
            onChange={handleChange}
          />
        </InputGroup>

        <SimpleGrid columns={2} spacing={1}>
          <InputGroup size="sm">
            <InputLeftElement
              children={
                <Icon fontSize="md" name="arrow-back" color="gray.300" />
              }
            />
            <Input
              placeholder="left"
              size="sm"
              type="text"
              name={ATTRIBUTES[type].left}
              value={values[ATTRIBUTES[type].left] || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup size="sm">
            <InputLeftElement
              children={
                <Icon fontSize="md" name="arrow-forward" color="gray.300" />
              }
            />
            <Input
              placeholder="right"
              size="sm"
              type="text"
              value={values[ATTRIBUTES[type].right] || ""}
              name={ATTRIBUTES[type].right}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup size="sm">
            <InputLeftElement
              children={<Icon fontSize="md" name="arrow-up" color="gray.300" />}
            />
            <Input
              placeholder="top"
              size="sm"
              type="text"
              value={values[ATTRIBUTES[type].top] || ""}
              name={ATTRIBUTES[type].top}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup size="sm">
            <InputLeftElement
              children={
                <Icon fontSize="md" name="chevron-down" color="gray.300" />
              }
            />
            <Input
              placeholder="bottom"
              size="sm"
              type="text"
              value={values[ATTRIBUTES[type].bottom] || ""}
              name={ATTRIBUTES[type].bottom}
              onChange={handleChange}
            />
          </InputGroup>
        </SimpleGrid>
      </FormControl>
    </Box>
  );
};

export default PaddingPanel;
