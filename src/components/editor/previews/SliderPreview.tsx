import React from 'react'
import { useInteractive } from '~hooks/useInteractive'
import ComponentPreview from '~components/editor/ComponentPreview'
import { Slider, Box } from '@chakra-ui/react'
import { useDropComponent } from '~hooks/useDropComponent'

const acceptedTypesStat: ComponentType[] = [
  'SliderTrack',
  'SliderThumb',
  'SliderMark',
]

export const SliderPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id, acceptedTypesStat)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box ref={drop(ref)} {...props}>
      <Slider {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </Slider>
    </Box>
  )
}

export default SliderPreview
