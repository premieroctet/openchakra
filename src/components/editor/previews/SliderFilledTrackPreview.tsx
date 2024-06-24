import React from 'react'
import { useInteractive } from '~hooks/useInteractive'
import ComponentPreview from '~components/editor/ComponentPreview'
import { SliderFilledTrack } from '@chakra-ui/react'
import { useDropComponent } from '~hooks/useDropComponent'

export const SliderFilledTrackPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, false)
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

export default SliderFilledTrackPreview
