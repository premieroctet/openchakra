import React, { memo } from 'react'
import { Accordion } from '@chakra-ui/core'

import PaddingPanel from '../panels/styles/PaddingPanel'
import DimensionPanel from '../panels/styles/DimensionPanel'
import BorderPanel from '../panels/styles/BorderPanel'
import DisplayPanel from '../panels/styles/DisplayPanel'
import PositionPanel from '../panels/styles/PositionPanel'
import TextPanel from '../panels/styles/TextPanel'
import AccordionContainer from '../AccordionContainer'
import ColorsControl from '../controls/ColorsControl'
import EffectsPanel from './styles/EffectsPanel'
import ChildrenInspector from '../ChildrenInspector'
import ParentInspector from '../ParentInspector'
import CustomPropsPanel from './CustomPropsPanel'

interface Props {
  isRoot: boolean
  showChildren: boolean
  parentIsRoot: boolean
}

const StylesPanel: React.FC<Props> = ({
  isRoot,
  showChildren,
  parentIsRoot,
}) => (
  <Accordion defaultIndex={[0]} allowMultiple>
    {!isRoot && (
      <AccordionContainer title="Custom props">
        <CustomPropsPanel />
      </AccordionContainer>
    )}

    {!isRoot && !parentIsRoot && (
      <AccordionContainer title="Parent">
        <ParentInspector />
      </AccordionContainer>
    )}

    {showChildren && (
      <AccordionContainer title="Children">
        <ChildrenInspector />
      </AccordionContainer>
    )}

    {!isRoot && (
      <>
        <AccordionContainer title="Layout">
          <DisplayPanel />
        </AccordionContainer>
        <AccordionContainer title="Position">
          <PositionPanel />
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
      </>
    )}

    <AccordionContainer title="Backgrounds">
      <ColorsControl
        withFullColor
        label="Color"
        name="backgroundColor"
        enableHues
      />
    </AccordionContainer>

    {!isRoot && (
      <>
        <AccordionContainer title="Border">
          <BorderPanel />
        </AccordionContainer>

        <AccordionContainer title="Effect">
          <EffectsPanel />
        </AccordionContainer>
      </>
    )}
  </Accordion>
)

export default memo(StylesPanel)
