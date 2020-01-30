import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  Select,
  Button,
  Link,
  InputGroup,
  InputRightElement,
  Input,
  Box,
  Accordion,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Flex
} from "@chakra-ui/core";
import { useBuilderContext } from "../../contexts/BuilderContext";
import omit from "lodash/omit";
import PaddingPanel from "./panels/PaddingPanel";
import DimensionPanel from "./panels/DimensionPanel";
import BorderPanel from "./panels/BorderPanel";
import FlexPanel from "./panels/FlexPanel";
import TextPanel from "./panels/TextPanel";
import { IoIosFlash } from "react-icons/io";
import FormControl from "./controls/FormControl";
import AccordionContainer from "./AccordionContainer";
import ColorsControl from "./controls/ColorsControl";
import Panels from "./panels/Panels";
import { useForm } from "../../hooks/useForm";
import { GoRepo } from "react-icons/go";
import { FaMagic } from "react-icons/fa";

const Inspector = () => {
  const { components, selectedComponent, setComponents } = useBuilderContext();

  const [quickProps, setQuickProps] = useState("");
  const { setValue, setValueFromEvent } = useForm();

  if (!selectedComponent || !components[selectedComponent]) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        direction="column"
        height="100%"
        textAlign="center"
        color="gray.400"
        px={4}
      >
        <Box mb={4} color="gray.300" as={FaMagic} fontSize="6xl" />
        Select an element on the editor to activate this panel
      </Flex>
    );
  }

  const component = components[selectedComponent];
  const { props, type, name: componentName, parent } = component;

  const handleDelete = () => {
    let updatedComponents: IComponents = { ...components };
    updatedComponents = omit(components, componentName);

    const children = updatedComponents[parent].children.filter(
      (el: string) => el !== componentName
    );

    updatedComponents[parent].children = children;
    setComponents(updatedComponents);
  };

  return (
    <>
      <Box bg="white">
        <Box
          fontWeight="semibold"
          fontSize="md"
          color="yellow.900"
          rounded="md"
          py={2}
          px={2}
          shadow="sm"
          bg="yellow.100"
          mb={3}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          {type}
          <Link isExternal href={`https://chakra-ui.com/${type.toLowerCase()}`}>
            <Box as={GoRepo} fontSize="1rem" color="yellow.900" />
          </Link>
        </Box>
      </Box>
      <Box bg="white" px={3}>
        <form
          onSubmit={(event: FormEvent) => {
            event.preventDefault();

            const [name, value] = quickProps.split(":");
            setValue(name, value);
            setQuickProps("");
          }}
        >
          <InputGroup size="sm">
            <InputRightElement
              children={<Box as={IoIosFlash} color="gray.300" />}
            />
            <Input
              value={quickProps}
              placeholder="Quickly add props"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setQuickProps(event.target.value)
              }
            />
          </InputGroup>
        </form>

        <Button
          rightIcon="small-close"
          display="block"
          mb={3}
          mt={2}
          size="xs"
          variant="link"
          onClick={handleDelete}
        >
          Remove
        </Button>

        <Panels component={component} />
      </Box>

      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionContainer title="Layout">
          <FlexPanel />
        </AccordionContainer>

        <AccordionContainer title="Spacing" defaultIsOpen={false}>
          <PaddingPanel
            type="margin"
            values={props}
            handleChange={setValueFromEvent}
          />
          <PaddingPanel
            type="padding"
            values={props}
            handleChange={setValueFromEvent}
          />
        </AccordionContainer>

        <AccordionContainer title="Size">
          <DimensionPanel values={props} handleChange={setValueFromEvent} />
        </AccordionContainer>

        <AccordionContainer title="Typography">
          <TextPanel handleChange={setValueFromEvent} values={props} />
        </AccordionContainer>

        <AccordionContainer title="Backgrounds">
          <ColorsControl
            withFullColor
            label="Color"
            name="backgroundColor"
            enableHues
            value={props.backgroundColor}
          />
        </AccordionContainer>

        <AccordionContainer title="Border">
          <BorderPanel />
        </AccordionContainer>

        <AccordionContainer title="Effect">
          <FormControl label="Opacity">
            <Slider
              onChange={value => setValue("opacity", value / 100)}
              value={props.opacity * 100 || 100}
            >
              <SliderTrack />
              <SliderFilledTrack />
              <SliderThumb />
            </Slider>
          </FormControl>
          <FormControl label="Shadow">
            <Select
              size="sm"
              value={props.shadow}
              onChange={setValueFromEvent}
              name="shadow"
            >
              <option>xs</option>
              <option>sm</option>
              <option>md</option>
              <option>lg</option>
            </Select>
          </FormControl>
        </AccordionContainer>
      </Accordion>
    </>
  );
};

export default Inspector;
