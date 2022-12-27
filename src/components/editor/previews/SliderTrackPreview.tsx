import React from 'react'
import { SliderTrack, Box } from '@chakra-ui/react'
import { useInteractive } from '~hooks/useInteractive'
import ComponentPreview from '~components/editor/ComponentPreview'

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
