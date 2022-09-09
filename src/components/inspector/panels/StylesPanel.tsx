import React, { memo } from 'react'
import { Accordion } from '@chakra-ui/react'
import PaddingPanel from '~components/inspector/panels/styles/PaddingPanel'
import DimensionPanel from '~components/inspector/panels/styles/DimensionPanel'
import BorderPanel from '~components/inspector/panels/styles/BorderPanel'
import DisplayPanel from '~components/inspector/panels/styles/DisplayPanel'
import TextPanel from '~components/inspector/panels/styles/TextPanel'
import AccordionContainer from '~components/inspector/AccordionContainer'
import ColorsControl from '~components/inspector/controls/ColorsControl'
import GradientControl from '~components/inspector/controls/GradientControl'
import EffectsPanel from './styles/EffectsPanel'
import ChildrenInspector from '~components/inspector/ChildrenInspector'
import ParentInspector from '~components/inspector/ParentInspector'
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
      {!isRoot && (
        <GradientControl
          withFullColor
          label="Gradient"
          name="bgGradient"
          options={[
            'to top',
            'to top right',
            'to top left',
            'to bottom right',
            'to bottom',
            'to bottom left',
            'to right',
            'to left',
          ]}
          enableHues
        />
      )}
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
