import React from 'react'
import { useInteractive } from '~hooks/useInteractive'
import ComponentPreview from '~components/editor/ComponentPreview'
import { SliderTrack } from '@chakra-ui/react'

const SliderTrackPreview: React.FC<IPreviewProps> = ({ component }) => {
  const { props } = useInteractive(component, false)

  return (
    <SliderTrack {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </SliderTrack>
  )
}

export default SliderTrackPreview
