import React from 'react'
import { useInteractive } from '~hooks/useInteractive'
import ComponentPreview from '~components/editor/ComponentPreview'
import { RangeSliderThumb, Box } from '@chakra-ui/react'

export const RangeSliderThumbPreview = ({ component }: IPreviewProps) => {
  const { props } = useInteractive(component, false)

  return (
    <Box display="inline-block" {...props}>
      <RangeSliderThumb {...component.props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </RangeSliderThumb>
    </Box>
  )
}

export default RangeSliderThumbPreview
