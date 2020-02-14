import React from 'react'
import { useInteractive } from '../../../hooks/useInteractive'
import { useDropComponent } from '../../../hooks/useDropComponent'
import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/core'
import ComponentPreview from '../ComponentPreview'

const acceptedTypes = [
  'SliderTrack',
  'SliderFilledTrack',
  'SliderThumb',
] as ComponentType[]

const SliderPreview: React.FC<IPreviewProps> = ({ component }) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id, acceptedTypes)

  let boxProps: any = {}

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box ref={drop(ref)} {...boxProps}>
      <Slider {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </Slider>
    </Box>
  )
}

export const SliderTrackPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <SliderTrack ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </SliderTrack>
  )
}

export const SliderFilledTrackPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <SliderFilledTrack ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </SliderFilledTrack>
  )
}

export const SliderThumbPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <SliderThumb ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </SliderThumb>
  )
}

export default SliderPreview
