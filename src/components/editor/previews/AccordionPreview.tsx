import React from 'react'
import { useInteractive } from '../../../hooks/useInteractive'
import { useDropComponent } from '../../../hooks/useDropComponent'
import { useHoverComponent } from '../../../hooks/useHoverComponent'
import {
  Box,
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/core'
import ComponentPreview from '../ComponentPreview'
import { AccordionWhitelist } from '../../../utils/editor'

const acceptedTypes: ComponentType[] = ['AccordionItem']

const AccordionPreview: React.FC<IPreviewProps> = ({ component }) => {
  const { drop, isOver } = useDropComponent(component.id, acceptedTypes)
  const { props, ref, boundingPosition } = useInteractive(component, true, drop)
  const { hover } = useHoverComponent(
    component.id,
    boundingPosition && {
      top: boundingPosition.top,
      bottom: boundingPosition.bottom,
    },
  )

  let boxProps: any = {}
  const hoverRef = hover(ref)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box ref={hoverRef} {...boxProps}>
      <Accordion {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </Accordion>
    </Box>
  )
}

export const AccordionHeaderPreview = ({ component }: IPreviewProps) => {
  const { drop, isOver } = useDropComponent(component.id, AccordionWhitelist)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <AccordionHeader ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </AccordionHeader>
  )
}

export const AccordionItemPreview = ({ component }: IPreviewProps) => {
  const { drop, isOver } = useDropComponent(component.id, AccordionWhitelist)
  const { props, ref } = useInteractive(component, true)

  let boxProps: any = {}

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box ref={drop(ref)} {...boxProps}>
      <AccordionItem {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </AccordionItem>
    </Box>
  )
}

export const AccordionPanelPreview = ({ component }: IPreviewProps) => {
  const { drop, isOver } = useDropComponent(component.id, AccordionWhitelist)
  const { props, ref } = useInteractive(component, true)

  let boxProps: any = {}

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box ref={drop(ref)} {...boxProps}>
      <AccordionPanel {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </AccordionPanel>
    </Box>
  )
}

export default AccordionPreview
