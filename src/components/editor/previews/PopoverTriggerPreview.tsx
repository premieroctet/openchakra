import React from 'react'
import { Popover, PopoverTrigger, Box, PopoverContent } from '@chakra-ui/core'
import { useInteractive } from '../../../hooks/useInteractive'
import { useDropComponent } from '../../../hooks/useDropComponent'
import ComponentPreview from '../ComponentPreview'
import { AccordionWhitelist } from '../../../utils/editor'

const acceptedTypes: ComponentType[] = [
  'PopoverTrigger',
  'PopoverContent',
  'Button',
]

const PopoverPreview: React.FC<IPreviewProps> = ({ component }) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id, acceptedTypes)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box ref={drop(ref)} {...props}>
      <Popover {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </Popover>
    </Box>
  )
}

export const PopoverTriggerPreview: React.FC<{ component: IComponent }> = ({
  component,
}) => {
  const { props, ref } = useInteractive(component)
  const { drop, isOver } = useDropComponent(component.id, AccordionWhitelist)
  const children = component.children

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <PopoverTrigger ref={drop(ref)} {...props}>
      {!children.length ? (
        <Box />
      ) : (
        <Box>
          <ComponentPreview componentName={children[0]} />
        </Box>
      )}
    </PopoverTrigger>
  )
}

export const PopoverContentPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id, AccordionWhitelist)

  if (isOver) {
    props.bg = 'teal.50'
  }

  const boxProps: any = {}

  return (
    <Box {...boxProps} ref={drop(ref)}>
      <PopoverContent {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </PopoverContent>
    </Box>
  )
}

export default PopoverPreview
