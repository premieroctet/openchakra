import React from 'react'
import { useInteractive } from '~hooks/useInteractive'
import ComponentPreview from '~components/editor/ComponentPreview'
import { Slider } from '@chakra-ui/react'
import { useDropComponent } from '~hooks/useDropComponent'

const acceptedTypesStat: ComponentType[] = ['SliderTrack', 'SliderThumb']

export const SliderPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id, acceptedTypesStat)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Slider ref={drop(ref)} {...props} p={0}>
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </Slider>
  )
}

export default SliderPreview
