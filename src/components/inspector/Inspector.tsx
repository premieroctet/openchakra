import React from "react";
import {
  Select,
  Button,
  Link,
  Box,
  Accordion,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Flex,
  ButtonGroup,
  IconButton
} from "@chakra-ui/core";
import PaddingPanel from "./panels/PaddingPanel";
import DimensionPanel from "./panels/DimensionPanel";
import BorderPanel from "./panels/BorderPanel";
import FlexPanel from "./panels/FlexPanel";
import TextPanel from "./panels/TextPanel";
import FormControl from "./controls/FormControl";
import AccordionContainer from "./AccordionContainer";
import ColorsControl from "./controls/ColorsControl";
import Panels from "./panels/Panels";
import { useForm } from "../../hooks/useForm";
import { GoRepo } from "react-icons/go";
import { FaMagic } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { IoMdRefresh } from "react-icons/io";
import { RootState } from "../..";
import { useSelector } from "react-redux";
import useDispatch from "../../hooks/useDispatch";
import QuickPropsPanel from "./QuickPropsPanel";
import { Tooltip } from "@chakra-ui/core";

const Inspector = () => {
  const dispatch = useDispatch();
  const selectedId = useSelector((state: RootState) => state.app.selectedId);
  const components = useSelector((state: RootState) => state.app.components);

  const { setValue, setValueFromEvent } = useForm();

  if (selectedId === "root" || !components[selectedId]) {
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

  const component = components[selectedId];
  const { props, type } = component;

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
          <Box>
            <Tooltip hasArrow aria-label="Reset" label="Reset">
              <IconButton
                size="xs"
                variant="ghost"
                aria-label="Reset"
                icon={IoMdRefresh}
              />
            </Tooltip>
            <Tooltip hasArrow aria-label="Doc" label="Doc">
              <IconButton
                size="xs"
                variant="ghost"
                as={Link}
                onClick={() => {
                  window.open(
                    `https://chakra-ui.com/${type.toLowerCase()}`,
                    "_blank"
                  );
                }}
                aria-label="Doc"
                icon={GoRepo}
              />
            </Tooltip>
            <Tooltip bg="red.500" hasArrow aria-label="Remove" label="Remove">
              <IconButton
                size="xs"
                variant="ghost"
                onClick={() => dispatch.app.deleteComponent(component.id)}
                aria-label="Remove"
                icon={FiTrash2}
              />
            </Tooltip>
          </Box>
        </Box>
      </Box>

      <Box bg="white" px={3}>
        <QuickPropsPanel />
        <Panels component={component} />
      </Box>

      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionContainer title="Layout">
          <FlexPanel />
        </AccordionContainer>

        <AccordionContainer title="Spacing">
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
          <FormControl label="Box shadow">
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
