import React from 'react'
import { useInteractive } from '~hooks/useInteractive'
import ComponentPreview from '~components/editor/ComponentPreview'
import { RangeSlider } from '@chakra-ui/react'
import { useDropComponent } from '~hooks/useDropComponent'

const acceptedTypesStat: ComponentType[] = [
  'RangeSliderTrack',
  'RangeSliderThumb',
]

export const RangeSliderPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id, acceptedTypesStat)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <RangeSlider ref={drop(ref)} {...props} p={0}>
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </RangeSlider>
  )
}

export default RangeSliderPreview
