import React from "react";
import { IconButton, ButtonGroup } from "@chakra-ui/core";
import ColorsControl from "../controls/ColorsControl";
import { GoBold, GoItalic } from "react-icons/go";
import {
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdFormatAlignCenter,
  MdFormatAlignJustify
} from "react-icons/md";
import FormControl from "../controls/FormControl";
import { ComboboxOption } from "@reach/combobox";
import InputSuggestion from "../inputs/InputSuggestion";
import theme from "../../../theme/theme";
import { useForm } from "../../../hooks/useForm";

import "@reach/combobox/styles.css";
type FlexPanelPropsType = {
  values: any;
  handleChange: any;
};

const TextPanel = ({ handleChange, values }: FlexPanelPropsType) => {
  const { setValue } = useForm();

  return (
    <>
      <FormControl label="Style">
        <IconButton
          mr={1}
          aria-label="bold"
          icon={GoBold}
          onClick={() => {
            setValue("fontWeight", values.fontWeight ? null : "bold");
          }}
          size="xs"
          variantColor={values.fontWeight ? "whatsapp" : "gray"}
          variant={values.fontWeight ? "solid" : "outline"}
        >
          Bold
        </IconButton>
        <IconButton
          aria-label="italic"
          icon={GoItalic}
          onClick={() => {
            setValue(
              "fontStyle",
              values.fontStyle === "italic" ? null : "italic"
            );
          }}
          size="xs"
          variantColor={values.fontStyle === "italic" ? "whatsapp" : "gray"}
          variant={values.fontStyle === "italic" ? "solid" : "outline"}
        >
          Italic
        </IconButton>
      </FormControl>

      <FormControl label="Text align">
        <ButtonGroup size="xs" isAttached>
          <IconButton
            aria-label="bold"
            icon={MdFormatAlignLeft}
            onClick={() => {
              setValue("textAlign", "left");
            }}
            variantColor={values.textAlign === "left" ? "whatsapp" : "gray"}
            variant={values.textAlign === "left" ? "solid" : "outline"}
          />

          <IconButton
            aria-label="italic"
            icon={MdFormatAlignCenter}
            onClick={() => {
              setValue("textAlign", "center");
            }}
            variantColor={values.textAlign === "center" ? "whatsapp" : "gray"}
            variant={values.textAlign === "center" ? "solid" : "outline"}
          />

          <IconButton
            aria-label="italic"
            icon={MdFormatAlignRight}
            onClick={() => {
              setValue("textAlign", "right");
            }}
            variantColor={values.textAlign === "right" ? "whatsapp" : "gray"}
            variant={values.textAlign === "right" ? "solid" : "outline"}
          />

          <IconButton
            aria-label="italic"
            icon={MdFormatAlignJustify}
            onClick={() => {
              setValue("textAlign", "justify");
            }}
            variantColor={values.textAlign === "justify" ? "whatsapp" : "gray"}
            variant={values.textAlign === "justify" ? "solid" : "outline"}
          />
        </ButtonGroup>
      </FormControl>

      <FormControl label="Font size" htmlFor="fontSize">
        <InputSuggestion
          value={values.fontSize}
          handleChange={handleChange}
          name="fontSize"
        >
          {Object.keys(theme.fontSizes).map(option => (
            <ComboboxOption value={option} />
          ))}
        </InputSuggestion>
      </FormControl>

      <ColorsControl
        withFullColor
        enableHues
        name="color"
        label="Color"
        value={values.color}
      />

      <FormControl label="Line height" htmlFor="lineHeight">
        <InputSuggestion
          value={values.lineHeight}
          handleChange={handleChange}
          name="lineHeight"
        >
          {Object.keys(theme.lineHeights).map(option => (
            <ComboboxOption value={option} />
          ))}
        </InputSuggestion>
      </FormControl>

      <FormControl label="Letter spacing" htmlFor="letterSpacing">
        <InputSuggestion
          value={values.letterSpacing}
          handleChange={handleChange}
          name="letterSpacing"
        >
          {Object.keys(theme.letterSpacings).map(option => (
            <ComboboxOption value={option} />
          ))}
        </InputSuggestion>
      </FormControl>
    </>
  );
};

export default TextPanel;
