import React from 'react'
import { RangeSliderTrack, Box } from '@chakra-ui/react'
import { useInteractive } from '~hooks/useInteractive'
import ComponentPreview from '~components/editor/ComponentPreview'

const RangeSliderTrackPreview: React.FC<IPreviewProps> = ({ component }) => {
  const { props } = useInteractive(component, false)

  return (
    <RangeSliderTrack {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </RangeSliderTrack>
  )
}

export default RangeSliderTrackPreview
