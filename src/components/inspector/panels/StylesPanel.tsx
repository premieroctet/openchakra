import React, { memo } from "react";
import { Accordion } from "@chakra-ui/core";

import PaddingPanel from "../panels/styles/PaddingPanel";
import DimensionPanel from "../panels/styles/DimensionPanel";
import BorderPanel from "../panels/styles/BorderPanel";
import DisplayPanel from "../panels/styles/DisplayPanel";
import TextPanel from "../panels/styles/TextPanel";
import AccordionContainer from "../AccordionContainer";
import ColorsControl from "../controls/ColorsControl";
import EffectsPanel from "./styles/EffectsPanel";

const StylesPanel = () => (
  <Accordion defaultIndex={[0]} allowMultiple>
    <AccordionContainer title="Layout">
      <DisplayPanel />
    </AccordionContainer>

    <AccordionContainer title="Spacing">
      <PaddingPanel type="margin" />
      <PaddingPanel type="padding" />
    </AccordionContainer>

    <AccordionContainer title="Size">
      <DimensionPanel />
    </AccordionContainer>

    <AccordionContainer title="Typography">
      <TextPanel />
    </AccordionContainer>

    <AccordionContainer title="Backgrounds">
      <ColorsControl
        withFullColor
        label="Color"
        name="backgroundColor"
        enableHues
      />
    </AccordionContainer>

    <AccordionContainer title="Border">
      <BorderPanel />
    </AccordionContainer>

    <AccordionContainer title="Effect">
      <EffectsPanel />
    </AccordionContainer>
  </Accordion>
);

export default memo(StylesPanel);
